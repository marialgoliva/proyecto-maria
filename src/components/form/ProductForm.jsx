"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Spinner from "react-bootstrap/Spinner";
import { checkForm, checkFormProducto } from "@/libs/utils";

function ProductForm() {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    color: "",
    precio: "",
    imagen: "",
  });

  const [image, setImage] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShowAlert(false);
    setAlertMessage("");
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    setShowAlert(false);
    setAlertMessage("");
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    setProduct({
      ...product,
      imagen: image,
    });
  }, [image]);

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        setProduct(res.data);
      });
    }
  }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("product :>> ", product);
    const check = checkFormProducto(product);
    if (check.valido) {
      setShowAlert(false);
      const formData = new FormData();
      formData.append("nombre", product.nombre);
      formData.append("descripcion", product.descripcion);
      formData.append("categoria", parseInt(product.categoria));
      formData.append("color", product.color);
      formData.append("precio", product.precio);

      if (image) {
        formData.append("imagen", image);
      }

      if (!params.id) {
        await axios.post("/api/products", formData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
      } else {
        await axios.put(`/api/products/${params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setLoading(false);
      router.push("/admin/products");
      router.refresh();
    } else {
      setLoading(false);
      setShowAlert(true);
      setAlertMessage(check.mensaje);
    }
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} ref={form}>
        <header>
          <h1 className={styles.bigtitle}>Añadir un producto</h1>
          {showAlert && (
            <div>
              <div class="alert alert-warning mt-2 " role="alert">
                {alertMessage}
              </div>
            </div>
          )}
        </header>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <input
          className={"row my-3 col-10 p-2 rounded"}
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          value={product.nombre}
        />
        <textarea
          className={"row my-3 col-10 p-2 rounded"}
          name="descripcion"
          id="descripcion"
          placeholder="Descripción"
          rows={3}
          onChange={handleChange}
          value={product.descripcion}
        />
        <input
          className={"row my-3 col-10 p-2 rounded"}
          type="number"
          name="categoria"
          id="categoria"
          placeholder="Categoría"
          onChange={handleChange}
          value={product.categoria}
        />
        <input
          className={"row my-3 col-10 p-2 rounded"}
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          onChange={handleChange}
          value={product.color}
        />
        <input
          className={"row my-3 col-10 p-2 rounded"}
          type="number"
          name="precio"
          id="precio"
          placeholder="0.00 €"
          onChange={handleChange}
          value={product.precio}
        />
        <div className="row my-3 col-10">
          <input
            type="file"
            className="appearance-none border border-black rounded w-full py-3 px-3"
            onChange={handleChangeFile}
          />
        </div>
        <div className={styles.button}>
          <button type="submit" className="btn btn-dark">
            {params.id ? "Actualizar producto" : "Crear producto"}
          </button>
        </div>
      </form>
      {image && (
        <div className="w-25 h-25 m-4 align-self-center">
          <Image
            src={URL.createObjectURL(image)}
            alt="Imagen del producto"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
      {product.imagen && !image && (
        <div className="w-25 h-25 m-4 align-self-center">
          <img src={product.imagen} alt="Imagen del producto" />
        </div>
      )}
    </div>
  );
}

export default ProductForm;

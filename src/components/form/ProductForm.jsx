"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Spinner from "react-bootstrap/Spinner";

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

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
    const formData = new FormData();
    formData.append("nombre", product.nombre);
    formData.append("descripcion", product.descripcion);
    formData.append("categoria", product.categoria);
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
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} ref={form}>
        <header>
          <h1>Añadir un producto</h1>
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
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
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

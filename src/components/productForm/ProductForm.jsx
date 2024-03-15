"use client"
import { useRef, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProductForm() {
  
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    color: "",
    precio: "",
  });  
  
  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setProduct({
        ...product,
        [e.target.name]: e.target.value
    })
  };

  
  const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/products', product);
        console.log(res);
        setProduct({
          nombre: "",
          descripcion: "",
          categoria: "",
          color: "",
          precio: ""
        });
        router.push('/admin/products')
        
        
        
  }
    
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} ref={form}>
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="nombre" id="nombre" placeholder="Nombre" onChange={handleChange} value={product.nombre} />
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="descripcion" id="descripcion" placeholder="Descripción" onChange={handleChange} value={product.descripcion} />
      <input className={"row my-3 col-10 p-2 rounded"} type="number" name="categoria" id="categoria" placeholder="Categoría" onChange={handleChange} value={product.categoria} />
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="color" id="color" placeholder="Color" onChange={handleChange} value={product.color} />
      <input className={"row my-3 col-10 p-2 rounded"} type="number" name="precio" id="precio" placeholder="0.00 €" onChange={handleChange} value={product.precio} />
      <div className={styles.button}>      
        <button type="submit" className="btn btn-primary">Crear producto</button>
      </div>
      </form>
    </div>
  )
}

export default ProductForm;

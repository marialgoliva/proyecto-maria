"use client"
import { useRef, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styles from "./styles.module.css";
import axios from "axios";

function ProductForm() {
  
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    color: "",
    precio: "",
  });  
  
  const form = useRef(null);

  const handleChange = (e) => {
    setProduct({
        ...product,
        [e.target.name]: e.target.value
    })
  };
  const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/products',product);
        console.log(res);
        form.current.reset();
  }
    
  return (
    <div className={styles.formContainer}>
      <Form className={styles.form} onSubmit={handleSubmit} ref={form}>
        <FormGroup className="row">
          <Label className="col-5" for="nombre">Nombre:</Label>
          <Input className="col-3" type="text" name="nombre" id="nombre" placeholder="Nombre" onChange={handleChange} value={product.nombre} />
        </FormGroup>
        <FormGroup className="row">
          <Label className="col-5" for="descripcion">Descripción:</Label>
          <Input className="col-5" type="text" name="descripcion" id="descripcion" placeholder="Descripción" onChange={handleChange} value={product.descripcion} />
        </FormGroup>
        <FormGroup className="row">
          <Label className="col-5" for="categoria">Categoría:</Label>
          <Input className="col-5" type="number" name="categoria" id="categoria" placeholder="Categoría" onChange={handleChange} value={product.categoria} />
        </FormGroup>
        <FormGroup className="row">
          <Label className="col-5" for="color">Color:</Label>
          <Input className="col-5" type="text" name="color" id="color" placeholder="Color" onChange={handleChange} value={product.color} />
        </FormGroup>
        <FormGroup className="row">
          <Label className="col-5" for="precio">Precio:</Label>
          <Input className="col-3" type="number" name="precio" id="precio" placeholder="0.00€" onChange={handleChange} value={product.precio} />
        </FormGroup>
        <Button color="primary">Crear producto</Button>
      </Form>
    </div>
  )
}

export default ProductForm;

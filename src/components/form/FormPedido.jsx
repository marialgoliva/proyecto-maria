"use client"
import { useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import dayjs from "dayjs";
import 'dayjs/locale/es';

function FormPedido() {
  
  const [pedido, setPedido] = useState({
    idPedido: "",
    idCliente: "",
    fechaPedido: "",
    fechaEntrega: "",
    estado: "",
    tipoPago: "",
    importeTotal: "",
  });  
  
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    
    setPedido({
      
        ...pedido,
        [e.target.name]: e.target.value
    })
    console.log(pedido);
  };

  useEffect(() =>{
    if (params.id) {
      
      axios.get('/api/pedidos/' + params.id)
      .then(res=>{
        setPedido({
          idPedido: res.data.idPedido,
          idCliente: res.data.idCliente,
          fechaPedido: dayjs(res.data.fechaPedido).locale('es').format('YYYY-MM-DD'),
          fechaEntrega: dayjs(res.data.fechaEntrega).locale('es').format('YYYY-MM-DD'),
          estado: res.data.estado,
          tipoPago: res.data.tipoPago,
          importeTotal: res.data.importeTotal,
        });
      })

    }
  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    if (!params.id){
      await axios.post('/api/pedidos', pedido);
      setPedido({
        idPedido: "",
        idCliente: "",
        fechaPedido: "",
        fechaEntrega: "",
        estado: "",
        tipoPago: "",
        importeTotal: "",
      });
    } else {
       await axios.put(`/api/pedidos/${params.id}` , pedido);
    }
    
    
    router.push('/admin/pedidos');
    router.refresh();



  }
    
  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} ref={form}>

      <header className="mb-4"><h1>Editar Pedido</h1></header>

      <label><h3>Id pedido:</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="idPedido" id="idPedido" 
      placeholder="idPedido" onChange={handleChange} value={pedido.idPedido} disabled />

      <label><h3>Cliente:</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="idCliente" id="idCliente" onChange={handleChange} value={pedido.idCliente} disabled/>

      <label><h3>Tipo de pago</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="tipoPago" id="tipoPago" placeholder="tipoPago" onChange={handleChange} value={pedido.tipoPago} disabled/>

      <label><h3>Fecha de creación del pedido:</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="date" name="fechaPedido" id="fechaPedido" onChange={handleChange} value={pedido.fechaPedido} disabled/>

      <hr></hr>

      <label><h3>Fecha de entrega:</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="date" name="fechaEntrega" id="fechaEntrega" onChange={handleChange} value={pedido.fechaEntrega} />
      
      <label><h3>Estado del pedido:</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="text" name="estado" id="estado" onChange={handleChange} value={pedido.estado} />

      <label><h3>Importe total:</h3></label>
      <input className={"row my-3 col-10 p-2 rounded"} type="number" name="importeTotal" id="importeTotal" placeholder="0.00 €" onChange={handleChange} value={pedido.importeTotal}/>
      <div className={styles.button}>      
        <button type="submit" className="btn btn-dark">{params.id ? 'Actualizar producto' : 'Crear producto'}</button>
      </div>
      </form>
    </div>
  )
}

export default FormPedido;

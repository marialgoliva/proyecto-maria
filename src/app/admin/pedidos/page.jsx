import axios from "axios";
import "@/styles/global.css";
import ProductList from "@/components/productList/ProductList";
import ListaPedidos from "@/components/productList/ListaPedidos";

async function cargarPedidos() {
  const { data } = await axios.get(process.env.REQUEST_URL_PEDIDOS);
  console.log(data)
  return data;
}
async function PaginaPedidos() {
  
  const pedidos = await cargarPedidos();
  if (pedidos.length === 0) return <h1>No hay pedidos</h1>;

  return (
    <div> 
      <ListaPedidos pedidos={pedidos}/>

    </div>
  );
}

export default PaginaPedidos;
import ProductCard from "@/components/productcard/ProductCard";
import axios from "axios";

async function cargarPedido(idPedido) {
    const {data} = await axios.get(
        `http://localhost:3000/api/pedidos/${idPedido}`
        );
    return data;
}

async function PaginaPedido({params}) {
    const pedido = await cargarPedido(params.id);
    console.log(pedido)
    return (
    <div className="d-flex justify-content-center">
      Página pedidos
    </div>
  )
}

export default PaginaPedido;
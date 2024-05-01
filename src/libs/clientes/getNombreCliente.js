import axios from "axios";

export async function getNombreCliente(id) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/cliente/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
}

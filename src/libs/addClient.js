import axios from "axios";

async function addClient(data) {
  try {
    const response = await axios.post("/api/clientes", cliente);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default addClient;

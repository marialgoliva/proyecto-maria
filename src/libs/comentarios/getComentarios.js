import axios from "axios";

export async function getComentarios(id) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/comentarios/${id}`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}

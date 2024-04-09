import { conn } from "../../database/mysql";

export async function getTalla(id) {
  try {
    const result = await conn.query("SELECT talla FROM talla WHERE idProducto = ?",
    [id]);
    
    if (result.length > 0) {
      return result;
    }
    
  } catch (error) {
    console.error(error);
    
  }
}
import { conn } from "../../database/mysql";

/**
 * Obtiene el rol de un usuario a partir de su correo electrónico.
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<string>} El rol del usuario.
 */
export async function getUserRole(email) {
  try {
    const result = await conn.query("SELECT rol FROM usuario WHERE email = ?", [
      email,
    ]);

    if (result.length > 0) {
      return result[0].rol;
    }
    return "user"; // Rol predeterminado si no se encuentra
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return "user"; // Rol predeterminado en caso de error
  }
}

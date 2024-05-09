/**
 * Envía el carrito de compras al servidor.
 * @param {Object} requestBody - El cuerpo de la solicitud que contiene los datos del carrito.
 * @returns {Promise<Response>} - Una promesa que se resuelve con la respuesta del servidor.
 * @throws {Error} - Si ocurre un error durante el proceso de envío del carrito.
 */
export async function sendCart(requestBody) {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error en el checkout:", error);
    throw error;
  }
}

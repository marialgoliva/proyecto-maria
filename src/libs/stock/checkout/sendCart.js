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

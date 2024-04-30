export function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    year +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0")
  );
}

export function getFechaEntrega(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate() + 5;

  // Crear un nuevo objeto Date con el año y mes de la fecha dada, y el día calculado
  const fechaEntrega = new Date(year, month, day);

  // Formatear la fecha de entrega como una cadena YYYY-MM-DD
  const formattedFechaEntrega =
    fechaEntrega.getFullYear() +
    "-" +
    (fechaEntrega.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    fechaEntrega.getDate().toString().padStart(2, "0");

  return formattedFechaEntrega;
}

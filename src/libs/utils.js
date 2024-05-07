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

export function checkForm(data) {
  const { nombre, dni, calle, cp, ciudad } = data;

  // Verificar que todos los campos están rellenos
  if (!nombre || !dni || !calle || !cp || !ciudad) {
    return { valido: false, mensaje: "Todos los campos deben estar rellenos." };
  }

  // Validar DNI (8 dígitos seguidos de una letra)
  const regexDNI = /^[0-9]{8}[A-Za-z]$/;
  if (!regexDNI.test(dni)) {
    return {
      valido: false,
      mensaje: "El DNI debe consistir en 8 dígitos seguidos de una letra.",
    };
  }

  // Validar código postal (5 dígitos)
  const regexCP = /^[0-9]{5}$/;
  if (!regexCP.test(cp)) {
    return {
      valido: false,
      mensaje: "El código postal debe consistir en 5 dígitos.",
    };
  }

  // Si todas las validaciones son correctas
  return { valido: true, mensaje: "Todos los datos son válidos." };
}

export function checkFormProducto(data) {
  const { nombre, descripcion, color, imagen, categoria, precio } = data;

  // Verificar que todos los campos requeridos estén rellenos
  if (!nombre || !descripcion || !color || !imagen || !categoria || !precio) {
    return {
      valido: false,
      mensaje: "Todos los campos deben estar rellenos.",
    };
  }

  // Verificar que la categoría sea un número entero
  if (!Number.isInteger(parseInt(categoria))) {
    return {
      valido: false,
      mensaje: "La categoría debe ser un número entero.",
    };
  }

  // Verificar que el precio sea un número
  if (isNaN(precio)) {
    return { valido: false, mensaje: "El precio debe ser un número válido." };
  }

  // Si todas las validaciones son correctas
  return { valido: true, mensaje: "Todos los datos son válidos." };
}

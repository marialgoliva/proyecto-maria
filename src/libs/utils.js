/**
 * Formatea una fecha en el formato "YYYY-MM-DD".
 *
 * @param {Date} date - La fecha a formatear.
 * @returns {string} La fecha formateada en el formato "YYYY-MM-DD".
 */
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

/**
 * Obtiene la fecha de entrega sumando 5 días a la fecha dada.
 *
 * @param {Date} date - La fecha de referencia.
 * @returns {string} La fecha de entrega formateada como una cadena en el formato "YYYY-MM-DD".
 */
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

/**
 * Verifica si todos los campos de un formulario están rellenos y realiza validaciones específicas.
 * @param {Object} data - Los datos del formulario.
 * @param {string} data.nombre - El nombre del usuario.
 * @param {string} data.dni - El DNI del usuario.
 * @param {string} data.calle - La calle del usuario.
 * @param {string} data.cp - El código postal del usuario.
 * @param {string} data.ciudad - La ciudad del usuario.
 * @returns {Object} - Un objeto con dos propiedades: 'valido' indica si los datos son válidos y 'mensaje' contiene un mensaje descriptivo.
 */
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

/**
 * Verifica si los campos de un formulario de producto están correctamente rellenados.
 * @param {Object} data - Los datos del formulario de producto.
 * @param {string} data.nombre - El nombre del producto.
 * @param {string} data.descripcion - La descripción del producto.
 * @param {string} data.color - El color del producto.
 * @param {string} data.imagen - La imagen del producto.
 * @param {string} data.categoria - La categoría del producto.
 * @param {string} data.precio - El precio del producto.
 * @returns {Object} - Un objeto con dos propiedades: 'valido' indica si los datos son válidos y 'mensaje' contiene un mensaje descriptivo.
 */
export function checkFormProducto(data) {
  const { nombre, descripcion, color, imagen, categoria, precio } = data;

  // Verificar que todos los campos requeridos estén rellenos
  if (!nombre || !descripcion || !color || !imagen || !categoria || !precio) {
    return {
      valido: false,
      mensaje: "Todos los campos deben estar rellenos.",
    };
  }

  // Verificar que la categoría sea un número entero positivo
  if (!Number.isInteger(parseInt(categoria)) || parseInt(categoria) <= 0) {
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

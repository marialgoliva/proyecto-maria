import { writeFile } from "fs/promises";
import path from "path";

/**
 * Procesa una imagen y la guarda en el sistema de archivos.
 * @param {Blob} image - La imagen a procesar.
 * @returns {Promise<string>} La ruta de la imagen guardada.
 */
export async function processImage(image) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const imagePath = path.join(process.cwd(), "public", image.name);
  await writeFile(imagePath, buffer);
  return imagePath;
}

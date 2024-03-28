import { writeFile } from "fs/promises";
import path from "path";

export async function processImage(image) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const imagePath = path.join(process.cwd(), "public", image.name);
  await writeFile(imagePath, buffer);
  return imagePath;
}

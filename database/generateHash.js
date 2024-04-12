const bcrypt = require("bcrypt");

async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function main() {
  let passwords = ["123456"]; // Puedes cambiar las contraseñas aquí

  const promises = passwords.map(async (password) => {
    const hash = await generateHash(password);
    return { password, hash }; // Retorna un objeto con la contraseña y su hash
  });

  const passwordHashPairs = await Promise.all(promises); // Espera a que todos los hashes estén listos

  console.log(passwordHashPairs); // Imprime los objetos de contraseña y hash
}

main();

import { decryptHybrid } from "../decrypt";
import { encryptHybrid } from "../encrypt";
import { generateRSAKeys } from "../keygen";

// Nota: Esta implementación de encriptación es interoperable entre Python y JavaScript. Puedes encriptar en un lenguaje y desencriptar en el otro sin problemas. Para más información, consulta la documentación en: [https://github.com/acadyne/cross-crypto-ts].

// Se genera la llave RSA de 4096 bits
const llaves_rsa = generateRSAKeys()

// Se extraen las llaves publicas y privadas
const publicKey = llaves_rsa.publicKey
const privateKey = llaves_rsa.privateKey

console.log("\npublicKey", publicKey);
console.log("\nprivateKey", privateKey);

// La data para encriptar 
const data = {
  "Saludo":"Hola AcaDyne con JavaScript"
}

// Encriptación (Tipo Cross)
const encrypt_data = encryptHybrid(data,publicKey);
console.log("\nencrypt_data", encrypt_data);

// Desencriptación (Tipo Cross)
const decrypt_data = decryptHybrid(encrypt_data,privateKey);
console.log("\ndecrypt_data", decrypt_data);
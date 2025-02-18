# 🚀 Cross Crypto TS 🔒  
**Encriptación híbrida segura entre Python y TypeScript (AES-GCM + RSA-OAEP).**  

## 📌 Introducción  
Cross Crypto TS es una librería de encriptación híbrida que combina **AES-GCM** para cifrado simétrico y **RSA-OAEP** para el intercambio seguro de claves. Su principal ventaja es la interoperabilidad entre **TypeScript** y **Python**, permitiendo cifrar datos en un lenguaje y descifrarlos en el otro sin problemas.  

## 🛠️ Uso
```bash
import { decryptHybrid } from "cross-crypto-ts/decrypt";
import { encryptHybrid } from "cross-crypto-ts/encrypt";
import { generateRSAKeys } from "cross-crypto-ts/keygen";

// Generar claves RSA de 4096 bits
const keys = generateRSAKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

console.log("\n🔑 Clave Pública:", publicKey);
console.log("\n🔐 Clave Privada:", privateKey);

// Datos a encriptar
const data = {
  "mensaje": "Hola AcaDyne desde JavaScript/TypeScript"
};

// 🔒 Encriptación (Cross Crypto)
const encryptedData = encryptHybrid(data, publicKey);
console.log("\n🛡️ Datos Encriptados:", encryptedData);

// 🔓 Desencriptación (Cross Crypto)
const decryptedData = decryptHybrid(encryptedData, privateKey);
console.log("\n✅ Datos Desencriptados:", decryptedData);
```

##  🎯 Características
✅ Encriptación híbrida: AES-GCM + RSA-OAEP
✅ Interoperabilidad total entre Python y TypeScript
✅ Seguridad avanzada con RSA de 4096 bits
✅ Ideal para cifrado de datos sensibles

## 📦 Instalación  

### TypeScript  
Instala el paquete con:  
```bash
$ npm install cross-crypto-ts
```

🔗 [NPM](https://www.npmjs.com/package/cross-crypto-ts)  
🔗 Repositorio de la versión en Python: [Cross Crypto Py](https://github.com/acadyne/cross-crypto-py)  

## 📄 Licencia
Este proyecto se encuentra bajo la licencia MIT.
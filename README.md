# 🚀 Cross Crypto TS 🔒  

![NPM Version](https://img.shields.io/npm/v/cross-crypto-ts) ![License](https://img.shields.io/github/license/acadyne/cross-crypto-ts) ![Build](https://img.shields.io/badge/build-passing-brightgreen) ![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)

**Encriptación híbrida segura entre TypeScript, Python y Rust (AES-GCM + RSA-OAEP).**  

---

## 📌 Introducción

Cross Crypto TS es una librería de encriptación híbrida que combina **AES-GCM** para cifrado simétrico y **RSA-OAEP** para el intercambio seguro de claves. Su principal ventaja es la interoperabilidad entre **TypeScript**, **Python** y **Rust**, permitiendo cifrar datos en un lenguaje y descifrarlos en otro sin problemas.

> Soporta JSON, archivos binarios (PDF, imágenes, etc), carpetas comprimidas, y modo streaming.

---

## 🛠️ Uso básico (modo JSON)

```ts
import { generateRSAKeys, encryptHybrid, decryptHybrid } from 'cross-crypto-ts';

// 🔑 Generar claves
const { publicKey, privateKey } = generateRSAKeys();

// 📩 Datos simples
const data = { mensaje: "Hola AcaDyne desde TS" };

// 🔒 Encriptar
const encrypted = encryptHybrid(data, publicKey);
console.log("🛡️ Encriptado:", encrypted);

// 🔓 Desencriptar
const decrypted = decryptHybrid(encrypted, privateKey);
console.log("✅ Desencriptado:", decrypted);
```

---

## 💡 Otros modos

### 🔹 Archivos binarios (`mode="binary"`)

```ts
const file = fs.readFileSync("foto.png");
const encrypted = encryptHybrid(file, publicKey, 'binary');
const decrypted = decryptHybrid(encrypted, privateKey);
fs.writeFileSync("foto_restaurada.png", decrypted);
```

### 🔸 Modo stream para archivos grandes

```ts
const encrypted = encryptHybrid("video.mp4", publicKey, "stream");
const outputPath = decryptHybrid(encrypted, privateKey);
console.log("Restaurado en:", outputPath);
```

### 📁 Archivos y carpetas completas (`encryptFileHybrid`)

```ts
const encrypted = encryptFileHybrid(["docs/", "archivo.pdf"], publicKey, {
  saveFile: true,
  outputEnc: "datos.enc",
});

const outputDir = decryptFileHybrid("datos.enc", privateKey);
console.log("Restaurado en:", outputDir);
```

---

## 📦 Instalación

```bash
npm install cross-crypto-ts
```

---

## 🌐 Ecosistema Cross-Crypto

- 🟦 [Cross Crypto Py (Python)](https://github.com/acadyne/cross-crypto-py)
- 🟨 [Cross Crypto TS (TypeScript)](https://github.com/acadyne/cross-crypto-ts)
- 🦀 [Cross Crypto RS (Rust)](https://github.com/acadyne/cross-crypto-rs)

---

## 🎯 Características

| Característica                                | ✅  |
| --------------------------------------------- | -- |
| Encriptación híbrida AES-GCM + RSA-OAEP       | ✔️ |
| RSA de 4096 bits                              | ✔️ |
| Interoperabilidad: TypeScript ↔ Python ↔ Rust | ✔️ |
| Soporte para objetos JSON                     | ✔️ |
| Soporte para archivos binarios                | ✔️ |
| Cifrado de carpetas y múltiples archivos      | ✔️ |
| Modo streaming para archivos grandes          | ✔️ |
| API amigable y tipada con TypeScript          | ✔️ |

---

## 📄 Licencia

MIT © Jose Fabian Soltero Escobar

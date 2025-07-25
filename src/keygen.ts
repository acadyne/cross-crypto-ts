// src/keygen.ts
import forge from 'node-forge';
import { RSAKeyPair } from './types';

export function generateRSAKeys(bits = 4096): RSAKeyPair {
  try {
    const keypair = forge.pki.rsa.generateKeyPair({ bits });
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

    return {
      publicKey: publicKeyPem,
      privateKey: privateKeyPem
    };
  } catch (error) {
    console.error("Error al generar las claves RSA:", error);
    throw new Error("Fallo la generación del par de claves RSA");
  }
}

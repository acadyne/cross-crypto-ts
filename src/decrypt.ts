// src/decrypt.ts
import forge from 'node-forge';
import fs from 'fs';
import path from 'path';
import v8 from 'v8';
import { EncryptedPayload } from './types';

export function decryptHybrid(encrypted: EncryptedPayload, privateKeyPem: string, outPath?: string): any {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const aesKey = privateKey.decrypt(forge.util.decode64(encrypted.encryptedKey), 'RSA-OAEP');
    const nonce = forge.util.decode64(encrypted.nonce);
    const tag = forge.util.decode64(encrypted.tag);

    const decipher = forge.cipher.createDecipher('AES-GCM', aesKey);
    decipher.start({
      iv: forge.util.createBuffer(nonce),
      tag: forge.util.createBuffer(tag)
    });

    if (encrypted.mode === 'stream') {
      if (!encrypted.encryptedPath) throw new Error('Path no encontrado en payload stream.');
      const encData = fs.readFileSync(encrypted.encryptedPath).toString('binary');
      decipher.update(forge.util.createBuffer(encData));
      const success = decipher.finish();
      if (!success) throw new Error('Tag inválido');
      const finalPath = outPath || encrypted.encryptedPath.replace('.enc', '_recuperado' + path.extname(encrypted.encryptedPath));
      fs.writeFileSync(finalPath, Buffer.from(decipher.output.getBytes(), 'binary'));
      return finalPath;
    }

    const encryptedDataBytes = forge.util.decode64(encrypted.encryptedData);
    decipher.update(forge.util.createBuffer(encryptedDataBytes));
    const success = decipher.finish();
    if (!success) throw new Error('Tag inválido');

    if (encrypted.mode === 'json') {
      const output = decipher.output.toString();
      return JSON.parse(output);
    } else if (encrypted.mode === 'binary') {
      return Buffer.from(decipher.output.getBytes(), 'binary');
    } else if (encrypted.mode === 'v8') {
      const buffer = Buffer.from(decipher.output.getBytes(), 'binary');
      return v8.deserialize(buffer);
    } else {
      throw new Error(`Modo desconocido: ${encrypted.mode}`);
    }
  } catch (e) {
    console.error('❌ Error desencriptando:', e);
    throw new Error('Desencriptación fallida');
  }
}

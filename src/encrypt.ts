// src/encrypt.ts
import forge from 'node-forge';
import fs from 'fs';
import v8 from 'v8';
import { EncryptedPayload } from './types';

export function encryptHybrid(
  data: object | Uint8Array | string,
  publicKeyPem: string,
  mode: 'json' | 'binary' | 'stream' | 'v8' = 'json'
): EncryptedPayload {
  const aesKey = forge.random.getBytesSync(32);
  const nonce = forge.random.getBytesSync(12);
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedAesKey = publicKey.encrypt(aesKey, 'RSA-OAEP');

  if (mode === 'stream') {
    if (typeof data !== 'string') throw new TypeError('Stream mode requiere path al archivo');
    const inputPath = data;
    const finalPath = inputPath + '.enc';

    const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
    cipher.start({ iv: nonce });

    const inputBuffer = fs.readFileSync(inputPath);
    cipher.update(forge.util.createBuffer(inputBuffer.toString('binary')));
    cipher.finish();

    const encryptedData = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();
    fs.writeFileSync(finalPath, Buffer.from(encryptedData, 'binary'));

    return {
      encryptedKey: forge.util.encode64(encryptedAesKey),
      nonce: forge.util.encode64(nonce),
      tag: forge.util.encode64(tag),
      encryptedPath: finalPath,
      mode: 'stream'
    };
  }

  let plaintext: string;
  if (mode === 'json') {
    plaintext = JSON.stringify(data);
  } else if (mode === 'v8') {
    const serialized = v8.serialize(data);
    plaintext = Buffer.from(serialized).toString('binary');
  } else if (Buffer.isBuffer(data)) {
    plaintext = data.toString('binary');
  } else {
    plaintext = Buffer.from(data as Uint8Array).toString('binary');
  }

  const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
  cipher.start({ iv: nonce });
  cipher.update(forge.util.createBuffer(plaintext));
  cipher.finish();

  const encrypted = cipher.output.getBytes();
  const tag = cipher.mode.tag.getBytes();

  return {
    encryptedKey: forge.util.encode64(encryptedAesKey),
    encryptedData: forge.util.encode64(encrypted),
    nonce: forge.util.encode64(nonce),
    tag: forge.util.encode64(tag),
    mode: mode
  };
}

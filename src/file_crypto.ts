// src/file_crypto.ts
import fs from 'fs';
import { encryptHybrid } from './encrypt';
import { EncryptedPayload, EncryptFileOptions } from './types';
import {
  createZipFromPaths,
  readBinaryFile,
  writeBinaryFile,
  collectMetadata,
  saveEncryptedJson,
  loadEncryptedJson,
  extractZipToDir
} from './core';
import { decryptHybrid } from './decrypt';

export function encryptFileHybrid(
  paths: string[],
  publicKey: string,
  options: EncryptFileOptions = {}
): Record<string, any> {
  if (!paths.length || !paths.every(fs.existsSync)) {
    throw new Error('Una o más rutas no existen o la lista está vacía.');
  }

  const zipName = options.zipOutput || `temp_${Date.now()}.zip`;
  const zipPath = createZipFromPaths(paths, zipName);
  const binaryData = readBinaryFile(zipPath);
  const encrypted = encryptHybrid(binaryData, publicKey, 'binary') as Record<string, any>;

  if (options.attachMetadata) {
    encrypted.meta = collectMetadata(zipPath);
  }

  if (options.saveFile) {
    const outPath = options.outputEnc || zipPath + '.enc';
    saveEncryptedJson(outPath, encrypted);
  }

  fs.unlinkSync(zipPath); // Eliminar el ZIP temporal
  return encrypted;
}

export function decryptFileHybrid(
  encPath: string,
  privateKey: string,
  extractTo?: string,
  cleanupZip: boolean = true
): string {
  if (!fs.existsSync(encPath)) {
    throw new Error(`Archivo cifrado no encontrado: ${encPath}`);
  }

  const encryptedObj = loadEncryptedJson(encPath);
  const decryptedBinary = decryptHybrid(encryptedObj as EncryptedPayload, privateKey);

  const tempZipPath = encPath.replace(/\.enc$/, '.zip');
  writeBinaryFile(tempZipPath, Buffer.from(decryptedBinary));

  const outputDir = extractTo || encPath.replace(/\.enc$/, '_output');
  extractZipToDir(tempZipPath, outputDir);

  if (cleanupZip) fs.unlinkSync(tempZipPath);

  return outputDir;
}

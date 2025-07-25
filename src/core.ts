// src/core.ts
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import crypto from 'crypto';
import AdmZip from 'adm-zip';

// Crear un ZIP a partir de múltiples rutas (archivos o carpetas)
export function createZipFromPaths(paths: string[], outputZipPath: string): string {
  const zip = new AdmZip();
  for (const p of paths) {
    if (!fs.existsSync(p)) throw new Error(`Path no existe: ${p}`);
    const stats = fs.statSync(p);

    if (stats.isDirectory()) {
      zip.addLocalFolder(p, path.basename(p));
    } else {
      zip.addLocalFile(p);
    }
  }
  zip.writeZip(outputZipPath);
  return outputZipPath;
}

// Extraer un ZIP a un directorio
export function extractZipToDir(zipPath: string, outputDir: string): void {
  if (!fs.existsSync(zipPath)) throw new Error(`ZIP no encontrado: ${zipPath}`);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(outputDir, true);
}

// Leer un archivo binario
export function readBinaryFile(filePath: string): Buffer {
  if (!fs.existsSync(filePath)) throw new Error(`Archivo no encontrado: ${filePath}`);
  return fs.readFileSync(filePath);
}

// Escribir un archivo binario
export function writeBinaryFile(filePath: string, data: Buffer): void {
  fs.writeFileSync(filePath, data);
}

// Detectar MIME type
export function detectMimeType(filePath: string): string {
  return mime.lookup(filePath) || 'application/octet-stream';
}

// Calcular hash SHA256
export function hashFile(filePath: string): string {
  const hash = crypto.createHash('sha256');
  const data = fs.readFileSync(filePath);
  hash.update(data);
  return hash.digest('hex');
}

// Recopilar metadatos de un archivo
export function collectMetadata(filePath: string): Record<string, any> {
  if (!fs.existsSync(filePath)) throw new Error(`Archivo no encontrado: ${filePath}`);
  return {
    filename: path.basename(filePath),
    mime: detectMimeType(filePath),
    size: fs.statSync(filePath).size,
    sha256: hashFile(filePath)
  };
}

// Guardar objeto cifrado como JSON
export function saveEncryptedJson(outputPath: string, data: Record<string, any>): void {
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}

// Leer objeto cifrado desde archivo JSON
export function loadEncryptedJson(jsonPath: string): Record<string, any> {
  if (!fs.existsSync(jsonPath)) throw new Error(`Archivo no encontrado: ${jsonPath}`);
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(raw);
}

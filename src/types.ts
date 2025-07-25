// src/types.ts
export type EncryptedPayload = JsonEncrypted | StreamEncrypted;

export interface RSAKeyPair {
  publicKey: string;
  privateKey: string;
}

export type JsonEncrypted = {
  encryptedKey: string;
  encryptedData: string;
  nonce: string;
  tag: string;
  mode: 'json' | 'binary' | 'v8';
};

export type StreamEncrypted = {
  encryptedKey: string;
  nonce: string;
  tag: string;
  encryptedPath: string;
  mode: 'stream';
};


export type EncryptFileOptions = {
  outputEnc?: string;
  zipOutput?: string;
  attachMetadata?: boolean;
  saveFile?: boolean;
};


import forge from 'node-forge';

export function encryptHybrid(data: object,publicKeyPem: string) {

    const dataStr = JSON.stringify(data);
    
    const aesKey = forge.random.getBytesSync(32);
    const nonce = forge.random.getBytesSync(12);

    const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
    cipher.start({ iv: nonce });
    cipher.update(forge.util.createBuffer(dataStr));
    cipher.finish();
    
    const encryptedData = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();

    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedAesKey = publicKey.encrypt(aesKey, 'RSA-OAEP');

    return {
        encryptedKey: forge.util.encode64(encryptedAesKey),
        encryptedData: forge.util.encode64(encryptedData),
        nonce: forge.util.encode64(nonce),
        tag: forge.util.encode64(tag)
    };
}

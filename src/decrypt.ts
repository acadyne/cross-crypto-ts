
import forge from 'node-forge';

export function decryptHybrid(encryptedData: {
    encryptedKey: string;
    encryptedData: string;
    nonce: string;
    tag: string;
}, privateKeyPem: string) {
    try {

        const encryptedKey = forge.util.decode64(encryptedData.encryptedKey);
        const encryptedDataBytes = forge.util.decode64(encryptedData.encryptedData);

        const nonceBuffer = forge.util.createBuffer(
            forge.util.decode64(encryptedData.nonce)
        );
        const tagBuffer = forge.util.createBuffer(
            forge.util.decode64(encryptedData.tag)
        );

        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        const aesKey = privateKey.decrypt(encryptedKey, 'RSA-OAEP');

        const decipher = forge.cipher.createDecipher('AES-GCM', aesKey);
        decipher.start({
            iv: nonceBuffer, 
            tag: tagBuffer  
        });
        decipher.update(forge.util.createBuffer(encryptedDataBytes));
        const success = decipher.finish();

        if (!success) throw new Error('Autenticación fallida: Tag inválido');

        return JSON.parse(decipher.output.toString());
    } catch (error) {
        console.error('Error desencriptando:', error);
        throw new Error('Desencriptación fallida');
    }
}
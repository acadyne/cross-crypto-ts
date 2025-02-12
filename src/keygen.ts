import forge from 'node-forge';

export function generateRSAKeys(bits = 4096): { publicKey: string; privateKey: string } {
    const keypair = forge.pki.rsa.generateKeyPair({ bits });
    
    return {
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
        privateKey: forge.pki.privateKeyToPem(keypair.privateKey)
    };
}
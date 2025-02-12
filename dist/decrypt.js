"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptHybrid = decryptHybrid;
const node_forge_1 = __importDefault(require("node-forge"));
function decryptHybrid(encryptedData, privateKeyPem) {
    try {
        const encryptedKey = node_forge_1.default.util.decode64(encryptedData.encryptedKey);
        const encryptedDataBytes = node_forge_1.default.util.decode64(encryptedData.encryptedData);
        const nonceBuffer = node_forge_1.default.util.createBuffer(node_forge_1.default.util.decode64(encryptedData.nonce));
        const tagBuffer = node_forge_1.default.util.createBuffer(node_forge_1.default.util.decode64(encryptedData.tag));
        const privateKey = node_forge_1.default.pki.privateKeyFromPem(privateKeyPem);
        const aesKey = privateKey.decrypt(encryptedKey, 'RSA-OAEP');
        const decipher = node_forge_1.default.cipher.createDecipher('AES-GCM', aesKey);
        decipher.start({
            iv: nonceBuffer,
            tag: tagBuffer
        });
        decipher.update(node_forge_1.default.util.createBuffer(encryptedDataBytes));
        const success = decipher.finish();
        if (!success)
            throw new Error('Autenticación fallida: Tag inválido');
        return JSON.parse(decipher.output.toString());
    }
    catch (error) {
        console.error('Error desencriptando:', error);
        throw new Error('Desencriptación fallida');
    }
}

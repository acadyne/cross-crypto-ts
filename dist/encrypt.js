"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptHybrid = encryptHybrid;
const node_forge_1 = __importDefault(require("node-forge"));
function encryptHybrid(data, publicKeyPem) {
    const dataStr = JSON.stringify(data);
    const aesKey = node_forge_1.default.random.getBytesSync(32);
    const nonce = node_forge_1.default.random.getBytesSync(12);
    const cipher = node_forge_1.default.cipher.createCipher('AES-GCM', aesKey);
    cipher.start({ iv: nonce });
    cipher.update(node_forge_1.default.util.createBuffer(dataStr));
    cipher.finish();
    const encryptedData = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();
    const publicKey = node_forge_1.default.pki.publicKeyFromPem(publicKeyPem);
    const encryptedAesKey = publicKey.encrypt(aesKey, 'RSA-OAEP');
    return {
        encryptedKey: node_forge_1.default.util.encode64(encryptedAesKey),
        encryptedData: node_forge_1.default.util.encode64(encryptedData),
        nonce: node_forge_1.default.util.encode64(nonce),
        tag: node_forge_1.default.util.encode64(tag)
    };
}

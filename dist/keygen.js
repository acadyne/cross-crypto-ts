"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRSAKeys = generateRSAKeys;
const node_forge_1 = __importDefault(require("node-forge"));
function generateRSAKeys(bits = 4096) {
    const keypair = node_forge_1.default.pki.rsa.generateKeyPair({ bits });
    return {
        publicKey: node_forge_1.default.pki.publicKeyToPem(keypair.publicKey),
        privateKey: node_forge_1.default.pki.privateKeyToPem(keypair.privateKey)
    };
}

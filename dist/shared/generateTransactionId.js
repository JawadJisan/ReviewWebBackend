"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionId = void 0;
function generateTransactionId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10001);
    const transactionId = `#${timestamp}${random}`;
    return transactionId;
}
exports.generateTransactionId = generateTransactionId;

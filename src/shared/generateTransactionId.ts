export function generateTransactionId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10001);
  const transactionId = `#${timestamp}${random}`;
  return transactionId;
}

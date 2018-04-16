var Keypair = require("stellar-base").Keypair,
newAccount = Keypair.random(),
friendBot = 'https://friendbot.stellar.org/?addr=',
pubKey = newAccount.publicKey(),
secKey = newAccount.secret();

console.log("New key pair created! out");
console.log("  Account ID: " + pubKey);
console.log("  Secret: " + secKey);
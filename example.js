const { extractAaguid, formatAaguid } = require("./index.js");
const authenticatorsList = require('./authenticators.json');
// Example with data known *not* to have AT flag (typical authentication response)
const authDataAuth =
  "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFBUCgIutOmnd-P3TTsakYoMM292opQECAyYgASFYIGTgM0IiDgO9AqTMSMT1Tdh1sHiL99qEZJ4cdk8vJAyDIlggolBgLLxO9I2q9GuYsa8kBThr8-iXpiO4mL2z_73-Th4";

const aaguidBytesAuth = extractAaguid(authDataAuth);
const authenticatorId = formatAaguid(aaguidBytesAuth);

console.log("Authenticator UUID", authenticatorId);

console.log("Authenticator name:", authenticatorsList[authenticatorId].name);

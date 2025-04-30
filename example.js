const { extractAaguid, getAaguid } = require("./dist/bundle.js");
const authenticatorsList = require("./authenticator-names.js");

const authDataAuth =
  "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFBUCgIutOmnd-P3TTsakYoMM292opQECAyYgASFYIGTgM0IiDgO9AqTMSMT1Tdh1sHiL99qEZJ4cdk8vJAyDIlggolBgLLxO9I2q9GuYsa8kBThr8-iXpiO4mL2z_73-Th4";

const aaguidBytesAuth = extractAaguid(authDataAuth);
const authenticatorId = getAaguid(aaguidBytesAuth);

const foundAuthenticator = authenticatorsList.find(
  (authenticator) => authenticator.id === authenticatorId
);

console.log("Authenticator name: ", foundAuthenticator); // { id: 'fbfc3007-154e-4ecc-8c0b-6e020557d7bd', name: 'iCloud Keychain' }

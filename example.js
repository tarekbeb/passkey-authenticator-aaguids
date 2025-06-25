const { extractAaguid, getAaguid } = require("./dist/bundle.js");
const { authenticatorsList } = require("./dist/index.js");

const authDataAuth =
  "3-2yEIaP6m1RE1Mo_WZUI0wkHYpPsaRw7IsqFmSK1wtdAAAAAPv8MAcVTk7MjAtuAgVX170AFG0WDlLN-HNvP3T2tqUUBPmZJKRApQECAyYgASFYINN6VjykCrOClgNdlfsWc0ENOiltsWdl0maNSe--c21uIlgg6XuqykkVZhrYF9wW1PPaMp30Ozufs4vgspe1kze9uCk";

const aaguidBytesAuth = extractAaguid(authDataAuth);
const authenticatorId = getAaguid(aaguidBytesAuth);

const foundAuthenticator = authenticatorsList.find(
  (authenticator) => authenticator.id === authenticatorId
);

console.log("Authenticator name: ", foundAuthenticator); // { id: 'fbfc3007-154e-4ecc-8c0b-6e020557d7bd', name: 'iCloud Keychain' }

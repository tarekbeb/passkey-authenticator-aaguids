const inputs = require("./authenticators.json");
const fs = require("fs");

const namesOnly = Object.values(inputs).map((input, i) => ({
  id: Object.keys(inputs)[i],
  name: input.name,
}));

fs.writeFile(
  "authenticator-names.json",
  JSON.stringify(namesOnly, null, 2),
  (err) => {
    if (err) throw err;
    console.log("File with names only created");
  }
);

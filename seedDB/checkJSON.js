var fakerData = require("./fakerData.json");
console.log(fakerData.length);
dir = __dirname;
validator = require('valid-json');
validator.validate(dir)
  .then((invalids) => console.log(invalids.length, "invalid json files"))
  .catch((error) => (console.log("error traversing schemas directory:", error, "\nstack:\n", error.stack)));
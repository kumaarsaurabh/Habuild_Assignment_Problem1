const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");
const app = express();
const port = 3000;
const {
  validationBodyRules,
  checkRules,
  validationBodyRulesPut,
} = require("./validator");
const jwt = require("jsonwebtoken");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", db.getRating);
app.get("/:id", db.getRatingById);
app.put(
  "/:name",
  validationBodyRulesPut,
  checkRules,
  db.verifyToken,
  db.updateRating
);
app.post("/", validationBodyRules, checkRules, db.verifyToken, db.createEntry);

app.post("/login", db.login);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

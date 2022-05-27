const { body, validationResult,param } = require("express-validator");
validationBodyRules = [
  body("rating", "Rating should be between 1 to 100")
    .notEmpty()
    .isInt({ min: 1, max: 100 }),
  body("name", "Movie name cannot be empty").isLength({ min: 1 }),
];

validationBodyRulesPut = [
  body("rating", "Rating should be between 1 to 100")
    .notEmpty()
    .isInt({ min: 1, max: 100 }),
  param("name", "Movie name cannot be empty").isLength({ min: 1 }),
];

checkRules = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validationBodyRules,
  checkRules,
  validationBodyRulesPut,
};

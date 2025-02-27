const { checkSchema, validationResult } = require("express-validator");

//validating name, email, password
//for name- check that it cannot be empty, cannot have certain characters, trim whitespace, min value of 4, max val: 8
//email - trim, cannot be empty, isEmail
const validateUserRegistrationSchema = checkSchema({
  name: {
    trim: true,
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    matches: {
      options: [/^[A-Za-z_-]+$/],
      errorMessage:
        "Name cannot contain special characters other than (-) and (_)",
    },
    isLength: {
      options: { min: 4, max: 12 },
      errorMessage: "Name must not be longer than 10 characters",
    },
  },

  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Enter a valid email",
    },
    normalizeEmail: true,
  },

  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be 8 characters",
    },
    matches: {
      options: [/\d/],
      errorMessage: "Password must contain a number",
    },
  },
});

const validateUserLoginSchema = checkSchema({
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    isEmail: {
      errorMessage: "Enter a valid email",
    },
    normalizeEmail: true,
  },

  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be 8 characters",
    },
    matches: {
      options: [/\d/],
      errorMessage: "Password must contain a number",
    },
  },
});

//write the route, get the results, if results isEmpty(), pass next(), else return results.array
const validateUser = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    return res.status(422).json({ error: results.array() });
  }
  next();
};

module.exports = {
  validateUser,
  validateUserRegistrationSchema,
  validateUserLoginSchema,
};

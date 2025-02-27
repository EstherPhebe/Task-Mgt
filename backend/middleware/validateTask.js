const { body, validationResult } = require("express-validator");

const validateTask = [
  body("title").trim().notEmpty().isLength({ min: 5, max: 100 }),
  body("description")
    .trim()
    .optional()
    .isLength({ max: 200 })
    .withMessage("Description cannot be more than 200 characters"),
  body("due_by")
    .notEmpty()
    .isDate()
    .withMessage("Date must be YYYY-MM-DD")
    .custom((date) => {
      if (new Date(date) < new Date()) {
        throw new Error("Date cannot be before the current date");
      } else return true;
    }),
  body("priority")
    .trim()
    .notEmpty()
    .withMessage("Choose between Low, Medium and High")
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be either low, medium or high"),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Choose between Pending, In Progress and Completed")
    .isIn(["pending", "in progress", "completed"])
    .withMessage("Priority must be either pending, in progress, completed"),

  //write the route, get the results, if results isEmpty(), pass next(), else return results.array

  (req, res, next) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(422).json({ error: results.array() });
    }
    next();
  },
];

module.exports = validateTask;

import { body } from "express-validator";

const noEmpty = "cannot be empty.";
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 30 characters.";

export const validateUserSignUp = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${noEmpty}`)
    .bail()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`First name ${lengthErr}`),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${noEmpty}`)
    .bail()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Last name ${lengthErr}`),

  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Email ${noEmpty}`)
    .isEmail()
    .withMessage("Email must be a valid email format."),

  body("password")
    .trim()
    .isLength({ min: 6, max: 64 })
    .withMessage("Password must be between 6 and 64 characters."),

  body("confirmPassword")
    .trim()

    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Two passwords are not the same"),

  // // how to deal with here?
  // body("membership")
  //   .isIn(["true", "false"])
  //   .withMessage("Please choose whether you are a member."),
];

export const validateUserLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Email ${noEmpty}`)
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email format."),

  body("password").trim().notEmpty().withMessage(`Password ${noEmpty}`),
];

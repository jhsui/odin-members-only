import db from "../db/queries.js";
import bcrypt from "bcryptjs";
import {
  validateUserSignUp,
  validateUserLogin,
} from "../controllers/validators.js";

import { validationResult, matchedData } from "express-validator";
import passport from "passport";

export function homePageGet(req, res) {
  res.render("index");
}
export function signUpPageGet(req, res) {
  res.render("sign-up");
}

export const signUpPost = [
  validateUserSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Sign up failed.");

      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }

    try {
      const { firstName, lastName, username, password, membership } =
        matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);

      const membershipBoolean = membership === "true";
      await db.insertNewUser(
        firstName,
        lastName,
        username,
        hashedPassword,
        membershipBoolean,
      );

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

export function loginPageGet(req, res) {
  res.render("login");
}

export const loginPost = [
  validateUserLogin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login-failure", {
        errors: errors.array(),
      });
    }
    next();
  },

  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-failure",
  }),
];

export function loginSuccessPageGet(req, res) {
  res.render("login-success", {
    user: req.user,
  });
}

export function loginFailurePageGet(req, res) {
  res.render("login-failure");
}

export function postsGet(req, res) {
  res.render("posts");
}

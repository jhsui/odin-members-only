import db from "../db/queries.js";
import bcrypt from "bcryptjs";
import {
  validateUserSignUp,
  validateUserLogin,
} from "../controllers/validators.js";
import { validationResult, matchedData } from "express-validator";
import passport from "passport";
import { error } from "node:console";

export function homePageGet(req, res) {
  res.render("index", {
    user: req.user,
    info: req.flash("info"),
    errorMsg: req.flash("error"),
  });
}
export function signUpPageGet(req, res) {
  res.render("sign-up");
}

export const signUpPost = [
  validateUserSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }

    try {
      const { firstName, lastName, username, password, membership } =
        matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.insertNewUser(
        firstName,
        lastName,
        username,
        hashedPassword,
        false,
      );

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

export function loginPageGet(req, res) {
  res.render("login", {
    errorMsg: req.flash("error"),
  });
}

export const loginPost = [
  validateUserLogin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        errors: errors.array(),
      });
    }
    next();
  },

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
];

export function passcodePageGet(req, res) {
  if (req.user === undefined) {
    req.flash("error", "Please log in first.");
    return res.redirect("/login");
  }

  if (req.user.membership) {
    req.flash("error", "You already have membership.");
    return res.redirect("/");
  }

  res.render("passcode", {
    errorMsg: req.flash("error"),
  });
}

// Do we need to validate the input?
export async function passcodeCheckPost(req, res) {
  // check if in a session first
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in first.");
    return res.redirect("/login");
  }

  // then check passcode
  if (req.body.passcode !== process.env.PASSCODE) {
    return res.render("passcode", { errorMsg: "Passcode invalid." });
  }

  if (await db.updateMembership(req.user.id)) {
    req.flash("info", "You are a member now.");
    return res.redirect("/");
  } else {
    return res.render("passcode", {
      errorMsg: "Server error, please contact support.",
    });
  }
}

export function logOutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
}

export function messagesPageGet(req, res) {
  res.render("messages");
}

export function createMessageGet(req, res) {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in first.");
    return res.redirect("login");
  }

  if (!req.user.membership) {
    req.flash("error", "Please become a member first to post a message.");
    return res.redirect("/passcode");
  }

  res.render("create-message", {
    user: req.user,
  });
}

export async function createMessagePost(req, res) {
  await db.insertMessage(req.body.title, req.body.message, req.user.username);

  res.redirect("/messages");
}

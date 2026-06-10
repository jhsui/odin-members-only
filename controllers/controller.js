import db from "../db/queries.js";
import bcrypt from "bcryptjs";

export function homePageGet(req, res) {
  res.render("index");
}
export function signUpPageGet(req, res) {
  res.render("sign-up");
}

export async function signUpInsert(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    // ? how to deal with this error
    throw Error("Two passwords are not the same!");
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.insertNewUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      hashedPassword,
      req.body.membership,
    );

    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export function loginPageGet(req, res) {
  res.render("login");
}

export function loginSuccessPageGet(req, res) {
  res.render("login-success", {
    user: req.user,
  });
}

export function loginFailurePageGet(req, res) {
  res.render("login-failure");
}

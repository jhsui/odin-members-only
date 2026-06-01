import db from "../db/queries.js";

export function signUpPageGet(req, res) {
  res.render("sign-up");
}

export async function signUpInsert(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    // ???
    throw Error("Two passwords are not the same!");
  }

  let membership;
  if (req.body.membership === "Yes") {
    membership = true;
  } else {
    membership = false;
  }

  await db.insertNewUser(
    req.body.firstName,
    req.body.lastName,
    req.body.username,
    req.body.password,
    membership,
  );

  res.redirect("/");
}

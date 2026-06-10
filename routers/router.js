import { Router } from "express";
import {
  homePageGet,
  signUpPageGet,
  signUpInsert,
  loginPageGet,
  loginSuccessPageGet,
  loginFailurePageGet,
} from "../controllers/controller.js";

import passport from "passport";

export const router = Router();

router.get("/", homePageGet);

router.get("/sign-up", signUpPageGet);
router.post("/sign-up", signUpInsert);

router.get("/login", loginPageGet);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-failure",
  }),
);

router.get("/login-success", loginSuccessPageGet);
router.get("/login-failure", loginFailurePageGet);

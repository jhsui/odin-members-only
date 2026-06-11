import { Router } from "express";
import {
  homePageGet,
  signUpPageGet,
  signUpPost,
  loginPageGet,
  loginPost,
  loginSuccessPageGet,
  postsGet,
} from "../controllers/controller.js";

export const router = Router();

router.get("/", homePageGet);

router.get("/sign-up", signUpPageGet);
router.post("/sign-up", signUpPost);

router.get("/login", loginPageGet);
router.post("/login", loginPost);

router.get("/login-success", loginSuccessPageGet);

router.get("/posts", postsGet);

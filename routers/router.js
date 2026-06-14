import { Router } from "express";
import {
  homePageGet,
  signUpPageGet,
  signUpPost,
  loginPageGet,
  loginPost,
  passcodePageGet,
  passcodeCheckPost,
  logOutGet,
  messagesPageGet,
  createMessageGet,
  createMessagePost,
} from "../controllers/controller.js";

export const router = Router();

router.get("/", homePageGet);

router.get("/sign-up", signUpPageGet);
router.post("/sign-up", signUpPost);

router.get("/login", loginPageGet);
router.post("/login", loginPost);

router.get("/passcode", passcodePageGet);
router.post("/passcode", passcodeCheckPost);

router.get("/log-out", logOutGet);

router.get("/messages", messagesPageGet);
router.get("/create-new-message", createMessageGet);
router.post("/create-new-message", createMessagePost);

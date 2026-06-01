import { Router } from "express";
import { signUpPageGet, signUpInsert } from "../controllers/controller.js";

export const router = Router();

router.get("/", signUpPageGet);
router.post("/sign-up", signUpInsert);

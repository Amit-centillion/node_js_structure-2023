import { Router } from "express";
import userController from "../controller/user-controller";

const router = Router();

router.post("/update", userController.register);

export default router;

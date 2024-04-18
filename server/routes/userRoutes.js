import { Router } from "express";
import { Signup, Signin, Signout } from "../controllers/userControllers.js";

const router = Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.delete("/signout", Signout);

export default router;

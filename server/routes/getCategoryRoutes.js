import { Router } from "express";
import {
  getFashion,
  getElectronics,
  getFurniture,
} from "../controllers/categoryControllers.js";

const router = Router();

router.get("/Fashion", getFashion);
router.get("/Electronics", getElectronics);
router.get("/Furniture", getFurniture);

export default router;

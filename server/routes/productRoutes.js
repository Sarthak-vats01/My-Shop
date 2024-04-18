import { Router } from "express";
import multer from "multer";
import {
  addProduct,
  updateProductDetails,
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/productControllers.js";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getproducts", getProducts);
router.post("/getproductById", getProductById);
router.post("/addproduct/:id", upload.single("image"), addProduct);
router.patch("/updateproductfields/:id", updateProductDetails);
router.delete("/deleteproduct/:id", deleteProduct);

export default router;

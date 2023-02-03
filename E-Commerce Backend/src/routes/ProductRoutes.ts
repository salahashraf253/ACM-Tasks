const express = require("express");
import { createProduct, getProducts } from "../controller/ProductController";
import upload from "../middleware/image";

const router = express.Router();
router.post("/products",upload.single('image'), createProduct);
router.get("/products", getProducts);
export default router;

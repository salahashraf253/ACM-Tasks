const express = require("express");
import { createProduct, getProducts } from "../controller/ProductController";
const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
export default router;

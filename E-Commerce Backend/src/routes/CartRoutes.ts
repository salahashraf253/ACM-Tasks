const express = require("express");
import { addProduct, removeProduct,getCart } from "../controller/CartController";
const router = express.Router();

router.post("/users/:userId/carts/:productId", addProduct);
router.get("/users/:userId/cart", getCart);
router.delete('/users/:userId/carts/:productId',removeProduct);
export default router;

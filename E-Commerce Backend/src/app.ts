import express from "express";
import DataBase from "../src/database/index";
import UserRoutes from "../src/routes/UserRoutes";
import ProductRoutes from "../src/routes/ProductRoutes";
import CartRoutes from "../src/routes/CartRoutes";
import bodyParser from "body-parser";
import statusCode from "./constants/StatusCode";
require("dotenv").config();

DataBase.buildDatabase();
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(UserRoutes);
app.use(ProductRoutes);
app.use(CartRoutes);
app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.status(statusCode.NOT_FOUND).json({
    status: statusCode.NOT_FOUND,
    message: "Page not found!",
  });
});

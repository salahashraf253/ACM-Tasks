import express from "express";
import DataBase from "../src/database/index";
import UserRoutes from "../src/routes/UserRoutes";
import bodyParser from "body-parser";
require("dotenv").config();

DataBase.buildDatabase();
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(UserRoutes);
app.use("/public", express.static("public"));

async function main() {
  try {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(`Error! ${error}`);
  }
}

main();

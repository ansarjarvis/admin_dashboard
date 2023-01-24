import express from "express";
import {
  getProducts,
  getcustomers,
  getTransactions,
} from "../controllers/client.js";

let Router = express.Router();

Router.get("/products", getProducts);
Router.get("/customers", getcustomers);
Router.get("/transactions", getTransactions);

export default Router;

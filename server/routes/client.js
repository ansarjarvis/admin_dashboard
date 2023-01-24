import express from "express";
import {
  getProducts,
  getcustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

let Router = express.Router();

Router.get("/products", getProducts);
Router.get("/customers", getcustomers);
Router.get("/transactions", getTransactions);
Router.get("/geography", getGeography);

export default Router;

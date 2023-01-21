import express from "express";
import { getProducts } from "../controllers/client.js";

let Router = express.Router();

Router.get("/products", getProducts);

export default Router;

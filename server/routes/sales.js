import express from "express";
import { getSales } from "../controllers/sales.js";

let Router = express.Router();

Router.get("/sales", getSales);

export default Router;

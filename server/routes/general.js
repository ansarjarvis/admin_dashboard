import express from "express";
import { getUser } from "../controllers/general.js";
import { getDashboardStats } from "../controllers/general.js";

let Router = express.Router();

Router.get("/user/:id", getUser);
Router.get("/dashboard", getDashboardStats);

export default Router;

import express from "express";
import { getUser } from "../controllers/general.js";

let Router = express.Router();

Router.get("/user/:id", getUser);

export default Router;

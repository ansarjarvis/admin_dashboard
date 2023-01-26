import express from "express";

import { getAdmin } from "../controllers/management.js";
import { getPerformance } from "../controllers/management.js";

let Router = express.Router();

Router.get("/admin", getAdmin);
Router.get("/performance/:id", getPerformance);

export default Router;

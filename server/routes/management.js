import express from "express";

import { getAdmin } from "../controllers/management.js";

let Router = express.Router();

Router.get("/admin", getAdmin);

export default Router;

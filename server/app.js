import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import generalRouter from "./routes/general.js";
import clientRouter from "./routes/client.js";
import managementRouter from "./routes/management.js";
import salesRouter from "./routes/sales.js";

/* for seeding database */

// import User from "./models/User.js";
// import { dataUser } from "./seed-data/index.js";

/* Configuration */
dotenv.config();
let app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use("/", generalRouter);
app.use("/", clientRouter);
app.use("/", managementRouter);
app.use("/", salesRouter);

/* Mongoose setup */

let PORT = process.env.PORT || 8000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port : ${PORT}`));
    /* Only add data one data */
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));

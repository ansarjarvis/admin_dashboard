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
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
import Transation from "./models/Transaction.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
} from "./seed-data/index.js";

/* Configuration */
dotenv.config();
let app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use("/general", generalRouter);
app.use("/client", clientRouter);
app.use("/management", managementRouter);
app.use("/sales", salesRouter);

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
    /* Only add data one time */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transation.insertMany(dataTransaction);
  })
  .catch((error) => console.log(`${error} did not connect`));

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managmentRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import Transaction from "./models/Transaction.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataAffiliateStat,
  dataOverallStat,
  dataTransaction,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
// const corsOptions = {
//   origin: "https://millenials-dashboard.netlify.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managmentRoutes);
app.use("/sales", salesRoutes);
const port = process.env.PORT || 9000;

/* DATABASE */
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port: ${port}`);
      // User.insertMany(dataUser);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
      // OverallStat.insertMany(dataOverallStat);
      // AffiliateStat.insertMany(dataAffiliateStat);
      // Transaction.insertMany(dataTransaction);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

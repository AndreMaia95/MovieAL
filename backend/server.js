import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { routes } from "./routes/index.js";
import { dbInstance } from "./config/db.js";

// create express app
const app = express();

// client can be postman | react website | react localhost link | etc
const clientURL = "http://localhost:5500";

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

// add morgan to log http requests
app.use(morgan("short"));

// add support to json encoded url
app.use(express.json());
//  							 |
// add support to encoded url
app.use(express.urlencoded({ extended: true }));

// 										.
app.use("/api", routes);

// Connect to DB
try {
  dbInstance.sync({ force: false, alter: true });
} catch (error) {
  console.info(error);
}

// Start server
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    "Server up and running at http://%s:%s",
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});

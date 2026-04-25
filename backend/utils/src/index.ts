import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import routes from "./routes.js"; // Zid .js ken testa3mel ESM
import { startSendMailConsumer } from "./consumer.js";

// load env..
dotenv.config();

startSendMailConsumer();

// --- SALLA7NA HATHI: El esm lezem ykoun kima fey el .env ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,    // Kenet CLOUDINARY_API_KEY
  api_secret: process.env.CLOUDINARY_SECRET, // Kenet CLOUDINARY_API_SECRET
});

// intialize app...
const app = express();

// cross origin
app.use(cors());

// middleware.. 
// Zidna limit kbir lel JSON bech el Buffer (CV) yet-3adda blech machakel
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- CHECK EL ROUTE HATHA ---
app.use("/api/utils", routes);

const port = process.env.PORT || 3002; // Thabbet el PORT lezem 3002 kima fey el Auth .env
app.listen(port, () => {
  console.log(`✅ Utils Service is running on http://localhost:${port}`);
});
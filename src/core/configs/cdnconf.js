import { v2 as cloudinary } from "cloudinary";
import dotenv, { config } from "dotenv";
import process from "node:process";

dotenv.config();

config({ path: `.env.${process.env.ENV}` });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: process.env.SECURE,
});

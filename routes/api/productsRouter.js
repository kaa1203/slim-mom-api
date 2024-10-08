import express from "express";
import { fetchProducts } from "../../controllers/productsControllers.js";
import authToken from "../../middleware/auth.js";

const router = express.Router();

router.get('/', authToken, fetchProducts);

export { router };
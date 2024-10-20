import express from "express";
import authToken from "../../middleware/auth.js";
import { publicRoute, privateRoute, fetchAllRecord } from "../../controllers/calorieIntakeControllers.js";

const router = express.Router();

router.post('/public', publicRoute);
router.post('/private', authToken, privateRoute);
router.get('/private/', authToken, fetchAllRecord);
export { router };	
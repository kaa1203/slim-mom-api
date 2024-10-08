import express from "express";
import { addEntry, deleteEntry, fetchEntries, fetchEntryById } from "../../controllers/entriesControllers.js";
import authToken from "../../middleware/auth.js";

const router = express.Router();

router.get('/', authToken, fetchEntries);
router.post('/', authToken, addEntry);
router.get('/:entryId', authToken, fetchEntryById);
router.delete('/:entryId', authToken, deleteEntry);

export { router };
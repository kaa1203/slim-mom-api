import { Entries } from "../models/entriesModel.js";
import { entryValidator } from "../validator/validator.js";

const fetchEntries = async (req, res) => {
	const id = req.user._id;
	try {
		res.status(200).json(await Entries.find({ owner: id }));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const addEntry = async (req, res) => {
	const { error, value } = entryValidator(req.body);

	if (error) return res.status(400).json({ message: error.message });

	try {
		const { food } = value;
		const id = req.user._id;

		await Entries.create({ food, owner: id });
		
		res.status(200).json({ message: 'Entry Added!' });
	} catch (e) {
		res.status(500).json({ message: e.message});
	}
}

const fetchEntryById = async (req, res) => {
	const entryId = req.params.entryId;

	try {
		const existingEntry = await Entries.findById(entryId);

		if (!existingEntry) return res.status(400).json({ message: 'Entry does not exist!'});

		res.status(200).json(existingEntry);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const deleteEntry = async (req, res) => {
	const entryId = req.params.entryId;

	try {
		const existingEntry = await Entries.findByIdAndDelete(entryId);

		if (!existingEntry) return res.status(400).json({message: 'Entry does not exist!' });
		
		res.status(200).json({ message: 'Entry Deleted!' });	
	} catch (e) {
		res.status(500).json({ message: e.message})
	}
}

export {
	fetchEntries,
	addEntry,
	deleteEntry,
	fetchEntryById
}
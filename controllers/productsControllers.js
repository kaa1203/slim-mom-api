import { Products } from "../models/productsModel.js";

const fetchProducts = async(req, res) => {
	const query = req.query.q;
	const q = query ? query : "";

	try {
		res.status(200).json(await Products.find({ title: { $regex: new RegExp(q, 'i') } }));
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

export {
	fetchProducts
}
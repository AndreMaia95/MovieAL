import { TypeProduct  } from "../models/typeProduct.js";

// create new typeProduct, verify if name already exists
export const createTypeProduct = async (req, res) => {
    const { name } = req.body;
    const typeProduct = await TypeProduct.findOne({ where: { name } });
    if (typeProduct) {
        res.status(400).json({ message: "TypeProduct already exists" });
    } else {
        const newTypeProduct = await TypeProduct.create({ name });
        res.status(201).json({ message: "TypeProduct created successfully", newTypeProduct });
    }
}

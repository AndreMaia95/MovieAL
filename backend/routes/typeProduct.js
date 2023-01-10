import Router from "express";
import {
    createTypeProduct,
} from "../controllers/typeProduct.js";

const typeRoutes = Router();

typeRoutes.post("/createTypeProduct", createTypeProduct);

export { typeRoutes };
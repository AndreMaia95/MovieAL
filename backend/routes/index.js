import Router from "express";
import { userRoutes } from "./users.js";
import { typeRoutes } from "./typeProduct.js";

const routes = Router();

routes.use("/users", userRoutes);

routes.use("/typeProduct", typeRoutes);

export { routes };
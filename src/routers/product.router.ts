import { Router } from "express";
import { controller } from "../controllers/product.controller";

const router = Router();

router.get('/products', controller.getProducts);

export default router;
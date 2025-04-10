import { Router } from "express";
import { controller } from "../controllers/supplier.controller";

const router = Router();

router.get('/',);
router.post('/add-new', controller.addNew);


export default router;
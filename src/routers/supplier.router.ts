import { Router } from "express";
import { controller } from "../controllers/supplier.controller";

const router = Router();

router.get('/', controller.getSupplier);
router.post('/add-new', controller.addNew);
router.put('/update', controller.update);
router.put('/remove', controller.removeSupplier);
router.get('/get-form', controller.getForm);

export default router;
import { Router } from "express";
import { controller } from "../controllers/user.controller";

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/google-login', controller.loginWithGoogle);
router.get('/refesh-token', controller.refeshToken);

export default router;
import { Router } from "express";
import { controller } from "../controllers/user.controller";

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/google-login', controller.loginWithGoogle);

export default router;
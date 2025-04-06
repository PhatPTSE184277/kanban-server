import { Router } from "express"
import UserRouter from "./user.router";

const router = (app: any) => {
    app.use('/auth', UserRouter);
}

export default router;
import UserRouter from "./user.router";
import ProductRouter from "./product.router";
import { VerifyToken } from "../middlewares/verifyToken";

const router = (app: any) => {
    app.use('/auth', UserRouter);
    app.use(VerifyToken);
    app.use('/storage', ProductRouter);
}

export default router;
import UserRouter from "./user.router";
import ProductRouter from "./product.router";
import SupplierRouter from "./supplier.router";
import { VerifyToken } from "../middlewares/verifyToken";

const router = (app: any) => {
    app.use('/auth', UserRouter);
    app.use(VerifyToken);
    app.use('/storage', ProductRouter);
    app.use('/supplier', SupplierRouter);
}

export default router;
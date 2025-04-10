import SupplierModel from "../models/supplier.model";

const addNew = (req: any, res: any) => {
    const body = req.body;

    try {
        const newSupplier = new SupplierModel(body);
        newSupplier.save();

        res.status(200).json({
            message: 'Add new supplier successfully!',
            data: newSupplier
        })
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

export const controller = { addNew };
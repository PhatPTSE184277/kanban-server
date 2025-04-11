import { title } from 'process';
import SupplierModel from '../models/supplier.model';
import { supplierForm } from '../forms/supplier';

const getSupplier = async (req: any, res: any) => {
    const { pageSize, page } = req.query;

    try {
        const skip = (page - 1) * pageSize;
        const items = await SupplierModel.find({ isDeleted: false }).skip(skip).limit(pageSize);

        const total = await SupplierModel.countDocuments({ isDeleted: false });

        res.status(200).json({
            message: 'Suppliers',
            data: {
                total,
                items,  
            }
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const addNew = (req: any, res: any) => {
    const body = req.body;

    try {
        const newSupplier = new SupplierModel(body);
        newSupplier.save();

        res.status(200).json({
            message: 'Add new supplier successfully!',
            data: newSupplier
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const update = async (req: any, res: any) => {
    const body = req.body;
    const { id } = req.query;

    try {
        await SupplierModel.findByIdAndUpdate(id, body);

        res.status(200).json({
            message: 'Update supplier successfully!',
            data: []
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const removeSupplier = async (req: any, res: any) => {
    const body = req.body;
    const { id } = req.query;

    try {
        await SupplierModel.findByIdAndUpdate(id, body);

        res.status(200).json({
            message: 'Remove supplier successfully!',
            data: []
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

const getForm = async (req: any, res: any) => {
	try {
		const form = {
			title: 'Supplier',
			layout: 'horizontal',
			labelCol: 6,
			wrapperCol: 18,
			formItems: supplierForm,
		};

		res.status(200).json({
			message: '',
			data: form,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export const controller = { getSupplier, addNew, update, removeSupplier, getForm };

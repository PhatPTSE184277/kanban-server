import mongoose, { Schema } from "mongoose";

const SupplierShema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: String,
    product: String,
    categories: {
        type: [String],
    },
    price: Number,
    contact: String,
    isTaking: {
        type: Number,
        default: 0,
        enum: [0, 1],
    },
    email: String,
	active: Number,
    photoUrl: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const SupplierModel = mongoose.model('suppliers', SupplierShema);
export default SupplierModel;
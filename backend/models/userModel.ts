import mongoose from "mongoose";
import { roleType } from "../utils/validationSchema";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'renter' as roleType },
    profileInfo: {
        name: { type: String },
        avatar: { type: String },
        phone: { type: String },
        address: { type: String },
    }
},
    {
        timestamps: true,
    }
);

const userModel = mongoose.models.user || mongoose.model('User', userSchema);
export default userModel;

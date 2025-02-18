import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter', required: true },
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

import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    amenities: { type: [String], required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
    image: { type: [String], required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
    {
        timestamps: true,
    }
);

const propertyModel = mongoose.models.property || mongoose.model('Property', propertySchema);
export default propertyModel;

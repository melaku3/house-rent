import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const reviewModel = mongoose.models.review || mongoose.model('Review', reviewSchema);
export default reviewModel;

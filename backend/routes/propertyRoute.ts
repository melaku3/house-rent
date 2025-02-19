import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const propertyRoute = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (_req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
propertyRoute.route('/')
    .get(getProperties)
    .post(upload.single('image'), protect, restrictTo('landlord', 'admin'), createProperty);

propertyRoute.route('/propertyId')
    .get(getPropertyById)
    .patch(upload.single('image'), protect, restrictTo('landlord', 'admin'), updateProperty)
    .delete(protect, restrictTo('admin', 'landlord'), deleteProperty)

export default propertyRoute;

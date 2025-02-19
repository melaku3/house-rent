import propertyModel from "../models/propertyModel";
import expressAsyncHandler from "express-async-handler";
import { propertySchema, propertyUpdateSchema } from "../utils/validationSchema"

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public

export const getProperties = expressAsyncHandler(async (req, res) => {
    const properties = await propertyModel.find({});
    res.json(properties);
});

// @desc    Fetch single property
// @route   GET /api/properties/propertyId
// @access  Public

export const getPropertyById = expressAsyncHandler(async (req, res) => {
    const { propertyId } = req.body;
    if (!propertyId) {
        res.status(400);
        throw new Error('Property ID is required');
        return;
    }
    const property = await propertyModel.findById(propertyId);
    if (!property) {
        res.status(404);
        throw new Error('Property not found');
        return;
    }
    res.json(property);
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/landlord
export const createProperty = expressAsyncHandler(async (req, res) => {
    let { title, price, location, numberOfRooms, amenities, description, available } = req.body;
    available = available === 'false' ? false : true;
    price = Number(price);
    numberOfRooms = Number(numberOfRooms);
    amenities = amenities.split(',');
    const image = req.file ? [req.file.filename] : [];
    const validate = propertySchema.safeParse({ title, price, location, numberOfRooms, amenities, description, image, owner: req.body.user._id, available });
    if (!validate.success) {
        res.status(400);
        throw new Error(validate.error.issues[0].message);
        return;
    }
    const propertyExists = await propertyModel.findOne({ title, owner: req.body.user._id });
    if (propertyExists) {
        res.status(400);
        throw new Error('Property already exists');
        return;
    }

    const body = validate.data;
    const property = await propertyModel.create(body);

    res.status(201).json({ message: "Property created successfully" });

});


// @desc    Update a property
// @route   PUT /api/properties/propertyId
// @access  Private/landlord
export const updateProperty = expressAsyncHandler(async (req, res) => {
    let { propertyId, title, price, location, numberOfRooms, amenities, description, available } = req.body;
    price = Number(price);
    numberOfRooms = Number(numberOfRooms);
    amenities = amenities?.split(',');
    available = available === 'false' ? false : true;
    let image;
    if (req.file) {
        image = [req.file.filename];
    }
    const validate = propertyUpdateSchema.safeParse({ propertyId, title, price, location, numberOfRooms, amenities, description, image, available });
    if (!validate.success) {
        res.status(400);
        throw new Error(validate.error.issues[0].message);
        return;
    }
    const property = await propertyModel.findById(propertyId);
    if (!property) {
        res.status(404);
        throw new Error('Property not found');
        return;
    }

    const body = validate.data;
    await propertyModel.findByIdAndUpdate(propertyId, body, { new: true, runValidators: true });
    res.json({message: "Property updated successfully"});
});


// @desc    Delete a property
// @route   DELETE /api/properties/propertyId
// @access  Private/Admin
export const deleteProperty = expressAsyncHandler(async (req, res) => {
    const { propertyId } = req.body;
    if (!propertyId) {
        res.status(400);
        throw new Error('Property ID is required');
        return;
    }

    const property = await propertyModel.findByIdAndDelete(propertyId);
    if (!property) {
        res.status(404);
        throw new Error('Property not found');
        return;
    }
    res.json({ message: "Property deleted successfully" });
});

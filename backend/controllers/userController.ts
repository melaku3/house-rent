import userModel from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { updateUserSchema } from "../utils/validationSchema";

// @desc    Fetch all users
// @route   GET /api/users
// @access  admin
export const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await userModel.find({}).select('-password');
    res.json(users);
});

// @desc    Fetch user by id
// @route   GET /api/users/userId
// @access  admin
export const getUserById = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
        return;
    }
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
        return;
    }
    res.json(user);
});

// @desc    Update user by id
// @route   PATCH /api/users/userId
// @access  admin
export const updateUser = expressAsyncHandler(async (req, res) => {
    const { userId, ...body } = req.body;
    const validate = updateUserSchema.safeParse(body);
    if (validate.error) {
        res.status(400);
        throw new Error(validate.error.errors[0].message);
        return;
    }

    const user = await userModel.findByIdAndUpdate(userId, validate.data, { new: true });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
        return;
    }

    res.json({message: "User updated successfully"});
});

// @desc    Delete user by id
// @route   DELETE /api/users/userId
// @access  admin   
export const deleteUser = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400);
        throw new Error('User ID is required');
        return;
    }

    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
        return;
    }

    res.json({ message: 'User deleted successfully' });
});

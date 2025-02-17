import expressAsyncHandler from "express-async-handler";
import { userSchema } from "../utils/validationSchema";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const validate = userSchema.safeParse(body);
    if (validate.error) {
        res.status(400);
        res.json({ message: validate.error.errors[0].message });
        return;
    }

    const userExists = await userModel.findOne({ email: validate.data.email });
    if (userExists) {
        res.status(400);
        res.json({ message: 'User already exists' });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    validate.data.password = await bcrypt.hash(validate.data.password, salt);

    const user = new userModel(validate.data);
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = expressAsyncHandler(async (req, res) => {
    const body = req.body;

    const validate = userSchema.pick({ email: true, password: true }).safeParse(body);

    if (validate.error) {
        res.status(400);
        res.json({ message: validate.error.errors[0].message });
        return;
    }

    const user = await userModel.findOne({ email: validate.data.email });

    if (!user) {
        res.status(400);
        res.json({ message: 'Invalid email' });
        return;
    }

    const validPassword = await bcrypt.compare(validate.data.password, user.password);
    if (!validPassword) {
        res.status(400);
        res.json({ message: 'Invalid password' });
        return;
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '3m' });
    res.clearCookie('token');
    res.cookie('token', token, { path: '/', httpOnly: true, expires: new Date(Date.now() + 180000) });  // 3 minutes
    res.json({ message: 'User logged in successfully' });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Authenticated
export const logout = expressAsyncHandler(async (req, res) => {
    const currentUser = req.body.user;
    if (!currentUser) {
        res.status(401);
        throw new Error('Not authorized, no token');
        return;
    }
    const user = await userModel.findById(currentUser._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
        return;
    }
    res.clearCookie('token');
    res.json({ message: 'User logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Authenticated
export const getProfile = expressAsyncHandler(async (req, res) => {
    const currentUser = req.body.user;
    if (!currentUser) {
        res.status(401);
        throw new Error('Not authorized, no token');
        return;
    }
    const user = await userModel.findById(currentUser._id).select('profileInfo');
    if (!currentUser) {
        res.status(404);
        throw new Error('User not found');
        return;
    }
    res.json({ message: user });
});

// @desc    Update user profile
// @route   PATCH /api/auth/profile
// @access  Authenticated
export const updateProfile = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const validate = userSchema.shape.profileInfo.safeParse(body);
    const currentUser = req.body.user;
    if (!currentUser) {
        res.status(401);
        throw new Error('Not authorized, no token');
        return;
    }
    
    if (validate.error) {
        res.status(400);
        res.json({ message: validate.error.errors[0].message });
        return;
    }
    
    const user = await userModel.findById(currentUser._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
        return;
    }
    
    const updatedProfile = { ...user.profileInfo, ...validate.data };
    await userModel.findByIdAndUpdate(currentUser._id, { profileInfo: updatedProfile });
    res.json({message: validate.data});
});

// @desc    Delete user
// @route   DELETE /api/auth/delete
// @access  Authenticated
export const deleteUser = expressAsyncHandler(async (req, res) => {
    const currentUser = req.body.user;
    if (!currentUser) {
        res.status(401);
        throw new Error('Not authorized, no token');
        return;
    }
    const user = await userModel.findById(currentUser._id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
        return;
    }

    await userModel.findByIdAndDelete(currentUser._id);
    res.json("delete user");
});

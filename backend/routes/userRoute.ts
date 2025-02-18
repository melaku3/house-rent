import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { protect, restrictTo } from '../middlewares/authMiddleware';
const userRoute = express.Router();

userRoute.get(('/'), protect, restrictTo('admin'), getUsers) // get all users
userRoute.route('/userId')
    .get(protect, restrictTo('admin'), getUserById) // get user by id
    .patch(protect, restrictTo('admin'), updateUser) // update user by id
    .delete(protect, restrictTo('admin'), deleteUser); // delete user by id

export default userRoute;
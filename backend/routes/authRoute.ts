import express from 'express';
import { register, login, logout, getProfile, updateProfile, deleteUser } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const authRoute = express.Router();

authRoute.post('/register', register); // public route
authRoute.post('/login', login); // public route
authRoute.post('/logout', protect, logout); // private route
authRoute.route('/profile') // private route
    .get(protect, getProfile)
    .patch(protect, updateProfile);

authRoute.delete('/delete', protect, deleteUser);
export default authRoute;

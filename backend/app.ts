import express from 'express';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// import routes
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import propertyRoute from './routes/propertyRoute';

// Create Express server
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// api endpoints
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/properties', propertyRoute);

// error handler
app.use(errorHandler);

export default app;

import express from 'express';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// import routes
import authRoute from './routes/authRoute';

// Create Express server
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// api endpoints
app.use('/api/auth', authRoute);

// error handler
app.use(errorHandler);

export default app;

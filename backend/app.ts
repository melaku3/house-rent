import express from 'express';
import errorHandler from './middlewares/errorHandler';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Create Express server
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});


// error handler
app.use(errorHandler);

export default app;

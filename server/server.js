console.clear();
/**********************************/
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//import db config class
import { ConnectDB } from './config/db.config.js';

//import routes
import UserRouter from './routes/user.routes.js';
import PostRouter from './routes/post.routes.js';

// create an express instance
const app = express();
dotenv.config({ debug: true });

/**
 * middleWares
    --Cross-Origin-Resource-Sharing ====> enable all CORS requests
 */
app.use(cors());

/**
 * data parsing
 */
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

/**
 * use the routes
 */
//api test route @ index /
app.get('/', (req, res) => {
  res.send('contact list api ');
});

//use UserRouter @ /api/users
app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);

//handling undefined routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

/**
 * connect to database and run server
 */
const PORT = process.env.PORT || 8080;
const MONGO_URI_CONTACT_LIST = process.env.MONGO_URI_CONTACT_LIST;

ConnectDB(MONGO_URI_CONTACT_LIST, 'contactList');

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT} :: http://localhost:${PORT}`)
);

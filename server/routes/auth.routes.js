import express from 'express';
import { userSignUp } from '../controllers/auth.controllers.js';
import { upload } from '../helpers/fileUpload.helpers.js';
const AuthRouter = express.Router();

// user sign up
//files upload middleware
const cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'docs', maxCount: 8 },
]);
AuthRouter.post('/signup', cpUpload, userSignUp);

export default AuthRouter;

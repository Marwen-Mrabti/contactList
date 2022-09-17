import express from 'express';

/**
 * @description user route contain all methods to fetch or manipulate a user's information in the database
 * ----------------------------------------------
 * ----------------------------------------------
 * @method GET
 * @route /api/users/all
 * @description fetch all users
 * ----------------------------------------------
 * ----------------------------------------------
 * @method POST
 * @route /api/users/new
 * @description add new user
 * ----------------------------------------------
 * ----------------------------------------------
 * @method PUT
 * @route /api/users/update/user_id
 * @description update a user
 * ----------------------------------------------
 * ----------------------------------------------
 * @method DELETE
 * @route /api/users/delete/:user_id
 * @description delete a user
 */
const UserRouter = express.Router();

// load user handlers
import {
  CreateNewUser,
  DeleteUser,
  FetchAllUsers,
  FetchUserById,
  UpdateUser,
} from '../controllers/user.controllers.js';

/**
 * @route /api/users/all
 * @description fetch all users
 */
UserRouter.get('/all', FetchAllUsers);

/**
 * @route /api/users/:user_id
 * @description fetch a user by its id
 */
UserRouter.get('/:user_id', FetchUserById);

/**
 * @route /api/users/new
 * @description : create new user
 */
UserRouter.post('/new', CreateNewUser);

/**
 * @route /api/users/update/user_id
 * @description update an existing user
 */
UserRouter.patch('/update/:user_id', UpdateUser);

/**
 * @route /api/users/delete/:user_id
 * @description delete user
 */
UserRouter.delete('/delete/:user_id', DeleteUser);

// EXPORT USER ROUTER
export default UserRouter;

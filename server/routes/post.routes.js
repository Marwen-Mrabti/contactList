import express from 'express';
/**
 * @description post route contain all methods to fetch or manipulate a post's information in the database
 * ----------------------------------------------
 * ----------------------------------------------
 * @method GET
 * @route /api/posts/all/user_id
 * @description fetch all posts
 * ----------------------------------------------
 * ----------------------------------------------
 * @method POST
 * @route /api/posts/new/:user_id
 * @description add new post
 * ----------------------------------------------
 * ----------------------------------------------
 * @method PUT
 * @route /api/posts/edit/:user_id/:post_id
 * @description update a post
 * ----------------------------------------------
 * ----------------------------------------------
 * @method DELETE
 * @route /api/posts/delete/:user_id/:post_id
 * @description delete post
 */
const PostRouter = express.Router();

//load post handlers
import {
  CreateNewPost,
  DeleteUserPost,
  FetchUserPosts,
  UpdateUserPost,
} from '../controllers/post.controllers.js';

/**
 * @route /api/posts/all/:user_id
 * @description : fetch all posts created by a user
 */
PostRouter.get('/all/:user_id', FetchUserPosts);

/**
 * @route /api/posts/all/:user_id
 * @description : fetch a specific post created by a user
 */
// PostRouter.get('/new/:user_id', FetchUserPostById);

/**
 * @route /api/posts/new/:user_id
 * @description : create new user
 */
PostRouter.post('/new/:user_id', CreateNewPost);

/**
 * @route /api/posts/update/:user_id/:post_id
 * @description : update a specific user's post
 */
PostRouter.patch('/update/:user_id/:post_id', UpdateUserPost);

/**
 * @route /api/posts/delete/:user_id/:post_id
 * @description : delete a specific user's post
 */
PostRouter.delete('/delete/:user_id/:post_id', DeleteUserPost);

//EXPORT POST ROUTER
export default PostRouter;

import { User } from '../models/user.model.js';
import { Post } from '../models/post.model.js';

/********************* GET REQUESTS ************************ */
// FETCH USER POSTS
/**
 * @description : fetch a user's posts from the contactList database
 * @method  GET
 * @route /api/posts/all/:user_id
 * @param  {any} req
 * @param  {any} res
 * @returns  an array of posts [{...post1}, {...post2},...]
 */
export const FetchUserPosts = async (req, res) => {
  const { user_id } = req.params;
  try {
    const posts = await Post.find({ user: user_id }).sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FETCH  POST BY ID
/**
 * @description : fetch a user's post by its id from the contactList database
 * @method  GET
 * @route /api/posts/:user_id/:post_id
 * @param  {any} req
 * @param  {any} res
 * @returns  post
 */
export const FetchUserPostById = async (req, res) => {
  const { user_id, post_id } = req.params;
  try {
    const post = await Post.findOne({ user: user_id, _id: post_id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/********************* POST REQUESTS ************************ */
//CREATE NEW USER
/**
 * @description if the data is validate create a new user and save it to the contactList database
 * @method  POST
 * @route /api/posts/new/:user_id
 * @param  {any} req
 * @param  {any} res
 * @returns  message
 */
export const CreateNewPost = async (req, res) => {
  const { user_id } = req.params;
  try {
    //add input validation here
    const newPost = new Post({
      user: user_id,
      text: req.body.text,
      createdAt: new Date().toISOString(),
    });

    await User.updateOne(
      { _id: user_id },
      { $push: { posts: newPost._id } },
      { runValidators: true }
    );

    await newPost.save();
    res.status(201).json({ message: 'post added successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/********************* PATCH REQUESTS ************************ */
//UPDATE USER
/**
 *@description if a user exists and post exist update it in the database and in the user's posts array
 * @method  PATCH
 * @route /api/posts/update/:user_id/:post_id
 * @param  {any} req
 * @param  {any} res
 * @returns  updated post (string)
 */
export const UpdateUserPost = async (req, res) => {
  const { user_id, post_id } = req.params;

  try {
    const post = req.body;
    //add input validation here

    const updatedPost = await Post.findByIdAndUpdate(
      post_id,
      { ...post },
      { new: true, runValidators: true }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/********************* DELETE REQUESTS ************************ */
//DELETE USER
/**
 *@description if a user exists and post exist delete it from the database and remove it from the posts array
 * @method  DELETE
 * @route /api/posts/delete/:user_id/:post_id
 * @param  {any} req
 * @param  {any} res
 * @returns  a message (string)
 */
export const DeleteUserPost = async (req, res) => {
  const { user_id, post_id } = req.params;
  try {
    //remove post from the user's posts array
    await User.findByIdAndUpdate(user_id, { $pull: { posts: post_id } }, { new: true });
    //delete post from database
    await Post.findByIdAndRemove(post_id);
    res.status(201).json({ message: 'post deleted successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

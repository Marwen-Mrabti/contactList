import { Post } from '../models/post.model.js';
import { User } from '../models/user.model.js';

/********************* GET REQUESTS ************************ */
// FETCH ALL USERS
/**
 * @description : fetch all users from the contactList database
 * @method  GET
 * @route /api/users/all
 * @param  {any} req
 * @param  {any} res
 * @returns  an array of users [{...user1}, {...user2},...]
 */
export const FetchAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FETCH USER BY ID
/**
 * @description fetch a specific user by its id  from the contactList database
 * @method  GET
 * @route /api/users/:user_id
 * @param  {any} req
 * @param  {any} res
 * @returns  a user ({ ...user}) if it exists
 */
export const FetchUserById = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id);
    //
    res.status(200).json(user);
  } catch (error) {
    //server error
    res.status(500).json({ message: error.message });
  }
};

/********************* POST REQUESTS ************************ */
//CREATE NEW USER
/**
 * @description if the data is validate create a new user and save it to the contactList database
 * @method  POST
 * @route /api/users/new
 * @param  {any} req
 * @param  {any} res
 * @returns  the user ({ ...user}) that has been saved
 */
export const CreateNewUser = async (req, res) => {
  const user = req.body;
  try {
    //check if the email is already in the database
    const isUserEmailInDB = await User.findOne({ email: req.body.email });

    if (isUserEmailInDB) {
      res.status(400).json({ message: 'email already in use' });
    } else {
      const newUser = new User({
        ...user,
        addedAt: new Date().toISOString(),
      });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/********************* PATCH REQUESTS ************************ */
//UPDATE USER
/**
 *@description if a user exists update its info
 * @method  PUT
 * @route /api/users/update/:user_id
 * @param  {any} req
 * @param  {any} res
 * @returns  the updated user ({ ...user})
 */
export const UpdateUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { ...user, user_id },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/********************* DELETE REQUESTS ************************ */
//DELETE USER
/**
 *@description if a user exists delete it from the database
 * @method  DELETE
 * @route /api/users/delete/:user_id
 * @param  {any} req
 * @param  {any} res
 * @returns  a message (string)
 */
export const DeleteUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    await User.findByIdAndRemove(user_id);
    await Post.deleteMany({ user: user_id });
    res.status(201).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

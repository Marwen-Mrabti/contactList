import { User } from '../models/user.model.js';
import { upload } from '../helpers/fileUpload.helpers.js';

/**
 * @description register a new user (add new user to the database)
 * @param {*} req
 * @param {*} res
 * @returns {object} user
 */
export const userSignUp = async (req, res) => {
  const user = req.body;
  try {
    console.log("files :: ",req.files);
    //input validation
    const docsArray = [];
    req.files.docs.map((file) => docsArray.push(file.filename));

    const newUser = new User({
      ...user,
      avatarUrl: req.files.avatar[0].filename,
      userDocsUrls: docsArray,
      addedAt: new Date().toISOString(),
    });
    //password hashing

    await newUser.save();
    res.status(201).json(newUser);
  } catch (errors) {
    res.status(409).json({ message: errors.message });
  }
};

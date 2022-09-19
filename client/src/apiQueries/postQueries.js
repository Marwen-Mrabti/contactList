import axios from 'axios';

//posts api base url
const postsApiBaseUrl = 'http://localhost:8080/api/posts';

/**
 * @description fetch all posts created by specific user
 * @route /api/posts/all/:user_id
 * @param user_id
 * @returns an array of posts [{...post1}, {...post2},...]
 */
export const fetchUserPosts = async (user_id) => {
  try {
    const response = await axios.get(`${postsApiBaseUrl}/all/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description fetch a post by its id
 * @route /api/posts/:user_id/:post_id
 * @param user_id
 * @param post_id
 * @returns an object {...post}
 */
export const fetchUserPostById = async (user_id, post_id) => {
  try {
    const response = await axios.get(`${postsApiBaseUrl}/${user_id}/${post_id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description create new post
 * @route /api/posts/new/:user_id
 * @param user_id
 * @param userPost {...object}
 * @returns message "string"
 */
export const createUserPost = async (user_id, userPost) => {
  try {
    const response = await axios.post(`${postsApiBaseUrl}/new/${user_id}`, userPost);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description edit a post
 * @route /api/posts/update/:user_id/:post_id
 * @param user_id
 * @param post_id
 * @param post_data
 */
export const updateUserPost = async (user_id, post_id, updatedPost) => {
  try {
    await axios.patch(`${postsApiBaseUrl}/update/${user_id}/${post_id}`, updatedPost);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description delete a post
 * @route /api/posts/delete/:user_id/:post_id
 * @param user_id
 * @param post_id
 */
export const deleteUserPost = async (user_id, post_id) => {
  try {
    await axios.delete(`${postsApiBaseUrl}/delete/${user_id}/${post_id}`);
  } catch (error) {
    console.log(error.message);
  }
};

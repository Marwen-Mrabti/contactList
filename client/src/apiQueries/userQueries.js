import axios from 'axios';

const usersApiBaseUrl = 'http://localhost:8080/api/users';

/**
 * @description fetch all users
 * @route /api/users/all
 * @returns an array of users [{...user1}, {...user},...]
 */
export const fetchUsersList = async () => {
  try {
    const response = await axios.get(`${usersApiBaseUrl}/all`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description fetch a user by its id
 * @route /api/users/:user_id
 * @param user_id
 * @returns an object {...user}
 */
export const fetchUserById = async (user_id) => {
  try {
    const response = await axios.get(`${usersApiBaseUrl}/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description create a new user
 * @route /api/users/new
 * @param newUser {...newUser}
 * @returns an object {...user}
 */
export const createNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${usersApiBaseUrl}/new`, newUser);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @description update a user
 * @route /api/users/update/:user_id
 * @param user_id
 * @param updatedUser {...updatedUser}
 * @returns an object {...user}
 */
export const EditUser = async (user_id, updatedUser) => {
  try {
    const response = await axios.patch(
      `${usersApiBaseUrl}/update/${user_id}`,
      updatedUser
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *@description if a user exists delete it from the database
 * @route /api/users/delete/:user_id
 * @param user_id
 * @returns  a message (string)
 */
export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`${usersApiBaseUrl}/delete/${userId}`);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

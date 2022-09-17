import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/users';

/**
 * fetch all users
 * @ baseUrl/all
 */
export const fetchUsersList = async () => {
  const response = axios.get(`${baseUrl}/all`);
  return response;
};

/**
 * fetch user by id
 * @ baseUrl/user_id
 */
export const fetchUserById = async (user_id) => {
  const response = axios.get(`${baseUrl}/${user_id}`);
  return response;
};

/**
 * create new user
 * @ baseUrl/new
 */
export const createNewUser = async (newUser) => {
  const response = axios.post(`${baseUrl}/new`, newUser);
  return response;
};

/**
 * update an existing user
 * @ baseUrl/update/:user_id
 */
export const EditUser = async (user_id, updatedUser) => {
  const response = axios.patch(`${baseUrl}/update/${user_id}`, updatedUser);
  return response;
};

/**
 * delete user
 * @ baseUrl/delete/:user_id
 */
export const deleteUserById = async (userId) => {
  const response = axios.delete(`${baseUrl}/delete/${userId}`);
  return response;
};

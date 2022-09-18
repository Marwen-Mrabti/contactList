import axios from 'axios';

const usersApiBaseUrl = 'http://localhost:8080/api/users';

/**
 * fetch all users
 * @ usersApiBaseUrl/all
 */
export const fetchUsersList = async () => {
  const { data } = await axios.get(`${usersApiBaseUrl}/all`);
  return data;
};

/**
 * fetch user by id
 * @ usersApiBaseUrl/user_id
 */
export const fetchUserById = async (user_id) => {
  const response = await axios.get(`${usersApiBaseUrl}/${user_id}`);
  return response;
};

/**
 * create new user
 * @ usersApiBaseUrl/new
 */
export const createNewUser = async (newUser) => {
  const response = await axios.post(`${usersApiBaseUrl}/new`, newUser);
  return response;
};

/**
 * update an existing user
 * @ usersApiBaseUrl/update/:user_id
 */
export const EditUser = async (user_id, updatedUser) => {
  const response = await axios.patch(`${usersApiBaseUrl}/update/${user_id}`, updatedUser);
  return response;
};

/**
 * delete user
 * @ usersApiBaseUrl/delete/:user_id
 */
export const deleteUserById = async (userId) => {
  const response = await axios.delete(`${usersApiBaseUrl}/delete/${userId}`);
  return response;
};

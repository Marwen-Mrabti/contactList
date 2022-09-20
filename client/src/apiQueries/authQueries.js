import axios from 'axios';

const authApiBaseUrl = 'http://localhost:8080/api/auth';
/**
 * @description create a new user
 * @route /api/auth/sign-up
 * @param newUser {...newUser}
 * @returns an object {...user}
 */
export const userSignUp = async (newUser) => {
  try {
    const response = await axios.post(`${authApiBaseUrl}/signup`, newUser);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

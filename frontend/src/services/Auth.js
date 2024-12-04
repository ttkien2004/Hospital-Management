import axiosClient from "../axios/axiosConfig";

export const AuthApi = {
  // Login API
  login: async (loginBody) => {
    try {
      const response = await axiosClient.post("/auth/login", loginBody);
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },

  // Register API
  register: async (registerBody) => {
    try {
      const response = await axiosClient.post("/auth/register", registerBody);
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};

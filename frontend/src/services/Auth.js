import axiosClient from "../axios/axiosConfig";

export const AuthApi = {
  // Login API
  login: async (UserName, UserPassword) => {
    const loginBody = {
      UserName,
      UserPassword,
    };
    try {
      const response = await axiosClient.post("/auth/login", loginBody);
      return response;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },

  // Register API
  register: async (UserName, UserPassword, UserID) => {
    const registerBody = {
      UserName,
      UserPassword,
      UserID,
    };
    try {
      const response = await axiosClient.post("/auth/register", registerBody);
      return response;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};

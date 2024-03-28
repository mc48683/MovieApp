import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  login: "user/login",
  register: "user/register",
  getInfo: "user/info"
};

const userApi = {
  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.login,
        { username, password }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  register: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(
        userEndpoints.register,
        { username, password, confirmPassword, displayName }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) { return { err }; }
  }
};

export default userApi;
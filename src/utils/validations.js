import apiAuth from "@/api/auth.api";

export const isAuthenticated = async () => {
  try {
    await apiAuth.checkToken(null, {
      headers: {
        token: localStorage.getItem("accessToken")
      }
    });
    return Promise.resolve();
  } catch (msg) {
    return apiAuth
      .refreshToken(null, {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
          "refresh-token": localStorage.getItem("refreshToken")
        }
      })
      .then(() => Promise.resolve())
      .catch(message => Promise.reject(message));
  }
};

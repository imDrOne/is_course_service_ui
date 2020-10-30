export const isAuthenticated = () =>
  localStorage.getItem("accessToken") || false;

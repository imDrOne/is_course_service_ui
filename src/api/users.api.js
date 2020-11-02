import axios from "axios";
import apiAuth from "@/api/auth.api";
import router from "@/router";

const rootApiURL =
  process.env.VUE_APP_ROOT_API_URL ||
  "https://uis-411-is-course.herokuapp.com/v1/api/uis-dashboard-service";

const apiUsers = axios.create({
  baseURL: `${rootApiURL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3"
  }
});

const getAllUsers = () => apiUsers.get("/users-controller/users");

const getAllPermissions = () =>
  apiUsers.get("/permissions-controller/permissionsDTO");

const createUser = data => apiUsers.post("/users-controller/newUser", data);

const rejectMiddleware = async err => {
  const { response, config: originalRequest } = err;
  if (response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const { data } = await apiAuth.refreshToken(null, {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
          "refresh-token": localStorage.getItem("refreshToken")
        }
      });
      originalRequest.headers.token = data.accessToken;
      return axios(originalRequest);
    } catch (e) {
      await router.replace({ name: "Login" });
      return Promise.reject(response.data.message);
    }
  }

  return Promise.reject(response.data.message);
};

apiUsers.interceptors.response.use(null, rejectMiddleware);
apiUsers.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log(1);
      config.headers["token"] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiUsers.getAllUsers = getAllUsers;
apiUsers.getAllPermissions = getAllPermissions;
apiUsers.createUser = createUser;

export default apiUsers;

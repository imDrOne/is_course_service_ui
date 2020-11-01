import axios from "axios";
import apiAuth from "@/api/auth.api";

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
  const { response } = err;
  if (response.status === 403) {
    try {
      await apiAuth.refreshToken(null, {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
          "refresh-token": localStorage.getItem("refreshToken")
        }
      });
      return Promise.reject("try");
    } catch (e) {
      return Promise.reject(response.data.message);
    }
  }

  return Promise.reject(response.data.message);
};

apiUsers.interceptors.response.use(null, rejectMiddleware);

apiUsers.getAllUsers = getAllUsers;
apiUsers.getAllPermissions = getAllPermissions;
apiUsers.createUser = createUser;

export default apiUsers;

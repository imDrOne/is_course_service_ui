import axios from "axios";

const rootApiURL =
  process.env.VUE_APP_ROOT_API_URL ||
  "https://uis-411-is-course.herokuapp.com/v1/api/uis-dashboard-service";

const apiUsers = axios.create({
  baseURL: `${rootApiURL}/users-controller`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3"
  }
});

const getAllUsers = () => apiUsers.get("/users");

const rejectMiddleware = err => {
  const {
    response: { data }
  } = err;

  return Promise.reject(data.message);
};

apiUsers.interceptors.response.use(null, rejectMiddleware);

apiUsers.getAllUsers = getAllUsers;

export default apiUsers;

import axios from "axios";

const rootApiURL =
  process.env.VUE_APP_ROOT_API_URL ||
  "https://uis-411-is-course.herokuapp.com/v1/api/uis-dashboard-service";

const apiAuth = axios.create({
  baseURL: `${rootApiURL}/auth-controller`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3"
  }
});

const signIn = (data, config) => apiAuth.post("/login", data, config);
const signOut = () => apiAuth.put("/logout");
const checkToken = () => apiAuth.get("/check-token");
const refreshToken = () => apiAuth.put("/refresh-token");

const resolveMiddleware = res => {
  const { config, data } = res;

  if (config.url === "/login") {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    apiAuth.defaults.headers.common["token"] = data.accessToken;
  }

  if (config.url === "/logout") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete apiAuth.defaults.headers.common["token"];
  }
  return res;
};

const rejectMiddleware = err => {
  const {
    response: { data }
  } = err;

  return Promise.reject(data.message);
};

apiAuth.interceptors.response.use(resolveMiddleware, rejectMiddleware);

apiAuth.signIn = signIn;
apiAuth.signOut = signOut;
apiAuth.checkToken = checkToken;
apiAuth.refreshToken = refreshToken;

export default apiAuth;

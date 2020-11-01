import axios from "axios";

import apiUsers from "@/api/users.api";

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
const signOut = (data, config) => apiAuth.put("/logout", data, config);
const checkToken = (data, config) => apiAuth.get("/check-token", config);
const refreshToken = (data, config) =>
  apiAuth.put("/refresh-token", data, config);

const permissions = () => JSON.parse(localStorage.getItem("permissions"));

const resolveMiddleware = res => {
  const { config, data } = res;

  if (config.url === "/login") {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("permissions", JSON.stringify(data.permissions));
    localStorage.setItem("requisites", JSON.stringify(data.requisites));
    apiAuth.defaults.headers.common["token"] = data.accessToken;
    apiUsers.defaults.headers.common["token"] = data.accessToken;
    apiAuth.defaults.headers.common["permissions"] = permissions().map(
      perm => perm.code
    );
  }

  if (config.url === "/logout") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("permissions");
    localStorage.removeItem("requisites");
    delete apiAuth.defaults.headers.common["token"];
  }

  if (config.url === "/refresh-token") {
    localStorage.setItem("accessToken", data.accessToken);
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

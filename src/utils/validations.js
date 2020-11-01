import apiAuth from "@/api/auth.api";

const passwordRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

const emailRegExp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const validateFormatPassword = password =>
  passwordRegExp.test(password) || {
    message: "Пароль не соответсвует формату",
    type: "formatError"
  };

const validateConfirmPassword = (password, confirmPassword) =>
  password === confirmPassword || {
    message: "Пароли не совпадают",
    type: "notMatchError"
  };

const validateEmail = email =>
  emailRegExp.test(email) || {
    message: "Неверный формат email",
    type: "formatError"
  };

const validateNullify = value =>
  !!value || {
    message: "Поле должно быть заполнено",
    type: "notMatchError"
  };

const isAuthenticated = async () => {
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

export {
  validateConfirmPassword,
  validateFormatPassword,
  isAuthenticated,
  validateEmail,
  validateNullify
};

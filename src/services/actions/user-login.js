/* Общие импорты */
import { requestForActions } from "./index";
import { setCookie } from "../../utils/cookie-functions";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const loginUserPost = (inputEmail, inputPassword) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail,
      password: inputPassword,
    }),
  };
};

export const loginUser = (inputEmail, inputPassword) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    requestForActions("auth/login", loginUserPost(inputEmail, inputPassword))
      .then((result) => {
        setCookie("accessToken", result.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          authorizedUser: result.success,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          email: result.user.email,
          name: result.user.name,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
          error: error.message,
        });
      });
  };
};

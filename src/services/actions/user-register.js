/* Общие импорты */
import { requestForActions } from "./index";
import { setCookie } from "../../utils/cookie-functions";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

const registerPost = (inputEmail, inputPassword, inputName) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail,
      password: inputPassword,
      name: inputName,
    }),
  };
};

export const registerUser = (inputEmail, inputPassword, inputName) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    requestForActions(
      "auth/register",
      registerPost(inputEmail, inputPassword, inputName)
    )
      .then((result) => {
        setCookie("accessToken", result.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          success: result.success,
          email: result.user.email,
          name: result.user.name,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          error: error.message,
        });
      });
  };
};

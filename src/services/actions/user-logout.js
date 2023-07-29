/* Общие импорты */
import { requestForActions } from "./index";
import { setCookie } from "../../utils/cookie-functions";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

const userLogoutData = () => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });

    requestForActions("auth/logout", userLogoutData())
      .then((result) => {
        setCookie("accessToken", "");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_SUCCESS,
          accessToken: "",
          refreshToken: "",
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_FAILED,
          error: error.message,
        });
      });
  };
};

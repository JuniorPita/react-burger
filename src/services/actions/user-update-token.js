/* Общие импорты */
import { requestForActions } from "./index";
import { setCookie } from "../../utils/cookie-functions";
import { refreshToken } from "./user";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

export const updateUserToken = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });

    requestForActions("auth/token", refreshToken())
      .then((result) => {
        setCookie("accessToken", result.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", result.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          error: error.message,
        });
      });
  };
};

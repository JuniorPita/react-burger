/* Общие импорты */
import { requestForActions } from "./index";
import { getCookie } from "../../utils/cookie-functions";
import { updateUserToken } from "./user-update-token";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

const userGet = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });

    requestForActions("auth/user", userGet())
      .then((result) => {
        dispatch({
          type: GET_USER_SUCCESS,
          email: result.user.email,
          name: result.user.name,
          success: result.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_FAILED,
          error: error.message,
        });

        dispatch(updateUserToken());
      });
  };
};

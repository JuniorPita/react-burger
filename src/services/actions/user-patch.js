/* Общие импорты */
import { requestForActions } from "./index";
import { getCookie } from "../../utils/cookie-functions";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";

const patchUserData = (inputEmail, inputName, inputPassword) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: inputEmail,
      name: inputName,
      password: inputPassword,
    }),
  };
};

export const patchUser = (inputEmail, inputName, inputPassword) => {
  return (dispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST,
    });

    requestForActions(
      "auth/user",
      patchUserData(inputEmail, inputName, inputPassword)
    )
      .then((result) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          email: result.user.email,
          name: result.user.name,
          success: result.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: PATCH_USER_FAILED,
          error: error.message,
        });
      });
  };
};

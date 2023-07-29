/* Общие импорты */
import { requestForActions } from "./index";

export const RESTORE_PASSWORD_REQUEST = "RESTORE_PASSWORD_REQUEST";
export const RESTORE_PASSWORD_SUCCESS = "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED = "RESTORE_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

const valuePasswordPost = (inputEmail) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail,
    }),
  };
};

export const restorePassword = (inputEmail) => {
  return (dispatch) => {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST,
    });

    requestForActions("password-reset", valuePasswordPost(inputEmail))
      .then((result) => {
        dispatch({
          type: RESTORE_PASSWORD_SUCCESS,
          success: result.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED,
          error: error.message,
        });
      });
  };
};

const resetPasswordPost = (inputPassword, inputCode) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: inputPassword,
      token: inputCode,
    }),
  };
};

export const resetPassword = (inputPassword, inputCode) => {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });

    requestForActions(
      "password-reset/reset",
      resetPasswordPost(inputPassword, inputCode)
    )
      .then((result) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          reset: result.success,
        });
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error: error.message,
        });
      });
  };
};

import { TServerResponse, request } from "./index";
import { setCookie, getCookie } from "../../utils/cookieFunction";
import { AppThunk } from "../types/types";

export const RESTORE_PASSWORD_REQUEST: "RESTORE_PASSWORD_REQUEST" =
  "RESTORE_PASSWORD_REQUEST";
export const RESTORE_PASSWORD_SUCCESS: "RESTORE_PASSWORD_SUCCESS" =
  "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED: "RESTORE_PASSWORD_FAILED" =
  "RESTORE_PASSWORD_FAILED";
export const SUCCESS_RESET: "SUCCESS_RESET" = "SUCCESS_RESET";
export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" =
  "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" =
  "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED: "REGISTER_USER_FAILED" =
  "REGISTER_USER_FAILED";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" =
  "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const PATCH_USER_REQUEST: "PATCH_USER_REQUEST" = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS: "PATCH_USER_SUCCESS" = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED: "PATCH_USER_FAILED" = "PATCH_USER_FAILED";

type TRestorePasswordRequest = {
  readonly type: typeof RESTORE_PASSWORD_REQUEST;
};

type TRestorePasswordSuccess = {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS;
  success: boolean;
};

type TRestorePasswordFailed = {
  readonly type: typeof RESTORE_PASSWORD_FAILED;
  error: string;
};

type TResetSuccess = {
  readonly type: typeof SUCCESS_RESET;
  success: boolean;
};

type TRegisterUserRequest = {
  readonly type: typeof REGISTER_USER_REQUEST;
};

type TRegisterUserSuccess = {
  readonly type: typeof REGISTER_USER_SUCCESS;
  success: boolean;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type TRegisterUserFailed = {
  readonly type: typeof REGISTER_USER_FAILED;
  error: string;
};

type TResetPasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  reset: boolean;
};

type TResetPasswordFailed = {
  readonly type: typeof RESET_PASSWORD_FAILED;
  error: string;
};

type TLoginRequest = {
  readonly type: typeof LOGIN_REQUEST;
};

type TLoginSuccess = {
  readonly type: typeof LOGIN_SUCCESS;
  authorizedUser: boolean;
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  success: boolean;
};

type TLoginFailed = {
  readonly type: typeof LOGIN_FAILED;
  error: string;
};

type TUpdateTokenRequest = {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
};

type TUpdateTokenSuccess = {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  accessToken: string;
  refreshToken: string;
};

type TUpdateTokenFailed = {
  readonly type: typeof UPDATE_TOKEN_FAILED;
  error: string;
};

type TGetUserRequest = {
  readonly type: typeof GET_USER_REQUEST;
};

type TGetUserSuccess = {
  readonly type: typeof GET_USER_SUCCESS;
  email: string;
  name: string;
  success: boolean;
};

type TGetUserFailed = {
  readonly type: typeof GET_USER_FAILED;
  error: string;
};

type TLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};

type TLogoutSuccess = {
  readonly type: typeof LOGOUT_SUCCESS;
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

type TLogoutFailed = {
  readonly type: typeof LOGOUT_FAILED;
  error: string;
};

type TPatchUserRequest = {
  readonly type: typeof PATCH_USER_REQUEST;
};

type TPatchUserSuccess = {
  readonly type: typeof PATCH_USER_SUCCESS;
  email: string;
  name: string;
  success: boolean;
};

type TPatchUserFailed = {
  readonly type: typeof PATCH_USER_FAILED;
  error: string;
};

const valuePasswordPost = (inputEmail: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail,
    }),
  };
};

type TRestorePasswordResponse = TServerResponse<{
  success: boolean;
}>;

export const restorePassword: AppThunk<void> = (inputEmail: string) => {
  return (dispatch) => {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST,
    });
    request<TRestorePasswordResponse>(
      "password-reset",
      valuePasswordPost(inputEmail)
    )
      .then((res) => {
        dispatch({
          type: RESTORE_PASSWORD_SUCCESS,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

const registerPost = (
  inputEmail: string,
  inputPassword: string,
  inputName: string
) => {
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

type TUser = {
  email: string;
  name: string;
};

type TUserResponse = TServerResponse<{
  user: TUser;
  accessToken: string;
  refreshToken: string;
}>;

export const registerUser: AppThunk<void> = (
  inputEmail,
  inputPassword,
  inputName
) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    request<TUserResponse>(
      "auth/register",
      registerPost(inputEmail, inputPassword, inputName)
    )
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          success: res.success,
          email: res.user.email,
          name: res.user.name,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          error: err.message,
        });
      });
  };
};

const resetPasswordPost = (inputPassword: string, inputCode: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: inputPassword,
      token: inputCode,
    }),
  };
};

type TResetPasswordResponse = TServerResponse<{
  reset: boolean;
}>;

export const resetPassword: AppThunk<void> = (
  inputPassword: string,
  inputCode: string
) => {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    request<TResetPasswordResponse>(
      "password-reset/reset",
      resetPasswordPost(inputPassword, inputCode)
    )
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          reset: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
};

const loginUserPost = (inputEmail: string, inputPassword: string) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: inputEmail,
      password: inputPassword,
    }),
  };
};

export const loginUser: AppThunk<void> = (
  inputEmail: string,
  inputPassword: string
) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    request<TUserResponse>(
      "auth/login",
      loginUserPost(inputEmail, inputPassword)
    )
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          authorizedUser: res.success,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          email: res.user.email,
          name: res.user.name,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          error: err.message,
        });
      });
  };
};

const refreshToken = () => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
};

export const updateUserToken: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    request<TUserResponse>("auth/token", refreshToken())
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          error: err.message,
        });
      });
  };
};

const userGet = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
  };
};

export const getUser: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    request<TUserResponse>("auth/user", userGet())
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
          error: err.message,
        });
        dispatch(updateUserToken());
      });
  };
};

const userLogoutData = () => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
};

export const logoutUser: AppThunk<void> = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    request<TUserResponse>("auth/logout", userLogoutData())
      .then((res) => {
        setCookie("accessToken", "");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_SUCCESS,
          accessToken: "",
          refreshToken: "",
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
          error: err.message,
        });
      });
  };
};

const patchUserData = (
  inputEmail: string,
  inputName: string,
  inputPassword: string
) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: inputEmail,
      name: inputName,
      password: inputPassword,
    }),
  };
};

export const patchUser: AppThunk<void> = (
  inputEmail: string,
  inputName: string,
  inputPassword: string
) => {
  return (dispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    request<TUserResponse>(
      "auth/user",
      patchUserData(inputEmail, inputName, inputPassword)
    )
      .then((res) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
          success: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: PATCH_USER_FAILED,
          error: err.message,
        });
      });
  };
};

export type TRestorePasswordActions =
  | TRestorePasswordRequest
  | TRestorePasswordSuccess
  | TRestorePasswordFailed
  | TResetSuccess;
export type TRegisterUserActions =
  | TRegisterUserRequest
  | TRegisterUserSuccess
  | TRegisterUserFailed;
export type TResetPasswordActions =
  | TResetPasswordRequest
  | TResetPasswordSuccess
  | TResetPasswordFailed;
export type TLoginActions = TLoginRequest | TLoginSuccess | TLoginFailed;
export type TUpdateTokenActions =
  | TUpdateTokenRequest
  | TUpdateTokenSuccess
  | TUpdateTokenFailed;
export type TGetUserActions =
  | TGetUserRequest
  | TGetUserSuccess
  | TGetUserFailed;
export type TLogoutActions = TLogoutRequest | TLogoutSuccess | TLogoutFailed;
export type TPatchUserActions =
  | TPatchUserRequest
  | TPatchUserSuccess
  | TPatchUserFailed;

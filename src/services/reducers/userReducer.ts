/* Общие импорты */
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  SUCCESS_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  TRegisterUserActions,
  TRestorePasswordActions,
  TResetPasswordActions,
  TLoginActions,
  TUpdateTokenActions,
  TGetUserActions,
  TLogoutActions,
  TPatchUserActions,
} from "../actions/user";

export type TUserActions = {
  loading: boolean;
  success: boolean;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  error: string;
  authorizedUser: boolean;
  failed: boolean;
  reset: boolean;
};

const initialState: TUserActions = {
  loading: false,
  success: false,
  email: "",
  name: "",
  accessToken: "Bearer ...",
  refreshToken: "",
  error: "",
  authorizedUser: false,
  failed: false,
  reset: false,
};

export const userReducer = (
  state = initialState,
  action:
    | TRegisterUserActions
    | TRestorePasswordActions
    | TResetPasswordActions
    | TLoginActions
    | TUpdateTokenActions
    | TGetUserActions
    | TLogoutActions
    | TPatchUserActions
): TUserActions => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        email: action.email,
        name: action.name,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    }
    case RESTORE_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
      };
    }
    case RESTORE_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        failed: true,
      };
    }
    case SUCCESS_RESET: {
      return {
        ...state,
        success: initialState.success,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        reset: action.reset,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        failed: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        email: action.email,
        name: action.name,
        authorizedUser: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        failed: true,
        error: action.error,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        loading: false,
        failed: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        success: action.success,
        email: action.email,
        name: action.name,
        authorizedUser: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        failed: true,
        loading: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        authorizedUser: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        failed: true,
        loading: false,
      };
    }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        email: action.email,
        name: action.name,
        success: action.success,
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        failed: true,
        loading: false,
      };
    }
    default:
      return state;
  }
};

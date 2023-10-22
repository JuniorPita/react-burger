import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  SUCCESS_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
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
  TRegisterUserRequest,
  TRegisterUserSuccess,
  TRegisterUserFailed,
  TLoginRequest,
  TLoginSuccess,
  TLoginFailed,
  TRestorePasswordRequest,
  TRestorePasswordSuccess,
  TRestorePasswordFailed,
  TResetSuccess,
  TResetPasswordRequest,
  TResetPasswordSuccess,
  TResetPasswordFailed,
  TUpdateTokenRequest,
  TUpdateTokenSuccess,
  TUpdateTokenFailed,
  TGetUserRequest,
  TGetUserSuccess,
  TGetUserFailed,
  TLogoutRequest,
  TLogoutSuccess,
  TLogoutFailed,
  TPatchUserRequest,
  TPatchUserSuccess,
  TPatchUserFailed,
} from "../actions/user";
import { TUserActions, userReducer } from "./userReducer";

const initialState = {
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
} as TUserActions;

describe("User Reducer", () => {
  describe("Initial state", () => {
    it("Should return initial state", () => {
      const action = {
        type: undefined,
      };
      const expected = initialState;

      // Shut down type checking to simulate runtime error
      const result = userReducer(undefined, action as any);

      expect(result).toStrictEqual(expected);
    });

    it("Should not change the state", () => {
      const action = {
        type: "Some weird action",
      };
      const expected = initialState;

      // Shut down type checking to simulate runtime error
      const result = userReducer(initialState, action as any);

      expect(result).toStrictEqual(expected);
    });
  });

  describe("REGISTER_USER Actions", () => {
    describe(`Action [${REGISTER_USER_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = { type: REGISTER_USER_REQUEST } as TRegisterUserRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${REGISTER_USER_SUCCESS}]`, () => {
      it("Should set action data to state and set loading to false", () => {
        const action = {
          type: REGISTER_USER_SUCCESS,
          success: true,
          email: "test@example.com",
          name: "Test User",
          accessToken: "Bearer newAccessToken",
          refreshToken: "newRefreshToken",
        } as TRegisterUserSuccess;
        const expected = {
          ...initialState,
          loading: false,
          success: true,
          email: "test@example.com",
          name: "Test User",
          accessToken: "Bearer newAccessToken",
          refreshToken: "newRefreshToken",
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${REGISTER_USER_FAILED}]`, () => {
      it("Should set error from action to state and set loading and success to false", () => {
        const action = {
          type: REGISTER_USER_FAILED,
          error: "Registration failed",
        } as TRegisterUserFailed;
        const expected = {
          ...initialState,
          loading: false,
          success: false,
          error: "Registration failed",
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe("LOGIN Actions", () => {
    describe(`Action [${LOGIN_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = { type: LOGIN_REQUEST } as TLoginRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${LOGIN_SUCCESS}]`, () => {
      it("Should set action data to state, set authorizedUser to true and set loading to false", () => {
        const action = {
          type: LOGIN_SUCCESS,
          success: true,
          accessToken: "Bearer newAccessTokenForLogin",
          refreshToken: "newRefreshTokenForLogin",
          email: "login@example.com",
          name: "Login User",
          authorizedUser: true,
        } as TLoginSuccess;
        const expected = {
          ...initialState,
          loading: false,
          success: true,
          accessToken: "Bearer newAccessTokenForLogin",
          refreshToken: "newRefreshTokenForLogin",
          email: "login@example.com",
          name: "Login User",
          authorizedUser: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${LOGIN_FAILED}]`, () => {
      it("Should set error from action to state and set loading to false and failed to true", () => {
        const action = {
          type: LOGIN_FAILED,
          error: "Login failed",
        } as TLoginFailed;
        const expected = {
          ...initialState,
          loading: false,
          failed: true,
          error: "Login failed",
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe("RESTORE_PASSWORD Actions", () => {
    describe(`Action [${RESTORE_PASSWORD_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = {
          type: RESTORE_PASSWORD_REQUEST,
        } as TRestorePasswordRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${RESTORE_PASSWORD_SUCCESS}]`, () => {
      it("Should set action data to state and set loading to false", () => {
        const action = {
          type: RESTORE_PASSWORD_SUCCESS,
          success: true,
        } as TRestorePasswordSuccess;
        const expected = {
          ...initialState,
          loading: false,
          success: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${RESTORE_PASSWORD_FAILED}]`, () => {
      it("Should set loading to false and failed to true", () => {
        const action = {
          type: RESTORE_PASSWORD_FAILED,
        } as TRestorePasswordFailed;
        const expected = {
          ...initialState,
          loading: false,
          failed: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe(`Action [${SUCCESS_RESET}]`, () => {
    it("Should reset success to initial state", () => {
      const action = { type: SUCCESS_RESET } as TResetSuccess;
      const expected = {
        ...initialState,
        success: false,
      } as TUserActions;

      const result = userReducer(initialState, action);

      expect(result).toStrictEqual(expected);
    });
  });

  describe("RESET_PASSWORD Actions", () => {
    describe(`Action [${RESET_PASSWORD_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = {
          type: RESET_PASSWORD_REQUEST,
        } as TResetPasswordRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${RESET_PASSWORD_SUCCESS}]`, () => {
      it("Should set action data to state and set loading to false", () => {
        const action = {
          type: RESET_PASSWORD_SUCCESS,
          reset: true,
        } as TResetPasswordSuccess;
        const expected = {
          ...initialState,
          loading: false,
          reset: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${RESET_PASSWORD_FAILED}]`, () => {
      it("Should set loading to false and failed to true", () => {
        const action = {
          type: RESET_PASSWORD_FAILED,
          error: "Reset password failed",
        } as TResetPasswordFailed;
        const expected = {
          ...initialState,
          loading: false,
          failed: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe("UPDATE_TOKEN Actions", () => {
    describe(`Action [${UPDATE_TOKEN_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = { type: UPDATE_TOKEN_REQUEST } as TUpdateTokenRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${UPDATE_TOKEN_SUCCESS}]`, () => {
      it("Should set action data to state and set loading to false", () => {
        const action = {
          type: UPDATE_TOKEN_SUCCESS,
          accessToken: "newAccessToken",
          refreshToken: "newRefreshToken",
        } as TUpdateTokenSuccess;
        const expected = {
          ...initialState,
          loading: false,
          accessToken: "newAccessToken",
          refreshToken: "newRefreshToken",
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${UPDATE_TOKEN_FAILED}]`, () => {
      it("Should set loading to false and failed to true", () => {
        const action = { type: UPDATE_TOKEN_FAILED } as TUpdateTokenFailed;
        const expected = {
          ...initialState,
          loading: false,
          failed: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe("GET_USER Actions", () => {
    describe(`Action [${GET_USER_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = { type: GET_USER_REQUEST } as TGetUserRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${GET_USER_SUCCESS}]`, () => {
      it("Should set action data to state, set authorizedUser to true and set loading to false", () => {
        const action = {
          type: GET_USER_SUCCESS,
          success: true,
          email: "user@example.com",
          name: "User",
        } as TGetUserSuccess;
        const expected = {
          ...initialState,
          success: true,
          email: "user@example.com",
          name: "User",
          loading: false,
          authorizedUser: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${GET_USER_FAILED}]`, () => {
      it("Should set loading to false and failed to true", () => {
        const action = { type: GET_USER_FAILED } as TGetUserFailed;
        const expected = {
          ...initialState,
          failed: true,
          loading: false,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe("LOGOUT Actions", () => {
    describe(`Action [${LOGOUT_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = { type: LOGOUT_REQUEST } as TLogoutRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${LOGOUT_SUCCESS}]`, () => {
      it("Should set action data to state, set authorizedUser to false and set loading to false", () => {
        const action = {
          type: LOGOUT_SUCCESS,
          success: true,
        } as TLogoutSuccess;
        const expected = {
          ...initialState,
          loading: false,
          success: true,
          authorizedUser: false,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${LOGOUT_FAILED}]`, () => {
      it("Should set loading to false and failed to true", () => {
        const action = { type: LOGOUT_FAILED } as TLogoutFailed;
        const expected = {
          ...initialState,
          failed: true,
          loading: false,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe("PATCH_USER Actions", () => {
    describe(`Action [${PATCH_USER_REQUEST}]`, () => {
      it("Should set loading to true", () => {
        const action = { type: PATCH_USER_REQUEST } as TPatchUserRequest;
        const expected = {
          ...initialState,
          loading: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${PATCH_USER_SUCCESS}]`, () => {
      it("Should set action data to state and set loading to false", () => {
        const action = {
          type: PATCH_USER_SUCCESS,
          email: "updated@example.com",
          name: "Updated Name",
          success: true,
        } as TPatchUserSuccess;
        const expected = {
          ...initialState,
          loading: false,
          email: "updated@example.com",
          name: "Updated Name",
          success: true,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });

    describe(`Action [${PATCH_USER_FAILED}]`, () => {
      it("Should set loading to false and failed to true", () => {
        const action = { type: PATCH_USER_FAILED } as TPatchUserFailed;
        const expected = {
          ...initialState,
          failed: true,
          loading: false,
        } as TUserActions;

        const result = userReducer(initialState, action);

        expect(result).toStrictEqual(expected);
      });
    });
  });
});

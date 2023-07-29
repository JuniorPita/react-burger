/* Общие импорты */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients-action";
import { getCookie } from "../../utils/cookie-functions";
import { updateUserToken } from "../../services/actions/user-update-token";
import { getUser } from "../../services/actions/user-get";
import { Routes, Route, useLocation } from "react-router-dom";

/* Компоненты */
import AppHeader from "../app-header/app-header";
import MainPage from "../main-page/main-page";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import PasswordForgotPage from "../../pages/password-forgot/password-forgot";
import PasswordResetPage from "../../pages/password-reset/password-reset";
import ProfilePage from "../../pages/profile/profile";
import InfoUserPage from "../../pages/info-user/info-user";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import LogoutUserRoute from "../logout-user-route/logout-user-route";
import IngredientsPage from "../../pages/ingredients/ingredients";
import ErrorPage from "../../pages/not-found/not-found";

const App = () => {
  const dispatch = useDispatch();
  const cookie = getCookie("accessToken");
  const userToken = localStorage.getItem("refreshToken");
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && userToken) {
      dispatch(updateUserToken());
    } else if (cookie && userToken) {
      dispatch(getUser());
    }
    // eslint-disable-next-line
  }, [cookie, userToken]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route
          path="/react-burger"
          element={<MainPage />}
          location={background || location}
        >
          <Route path="ingredients/:id" element={<IngredientsPage />} />
        </Route>
        <Route
          path="/react-burger/login"
          element={<LogoutUserRoute element={<LoginPage />} />}
        />
        <Route
          path="/react-burger/register"
          element={<LogoutUserRoute element={<RegisterPage />} />}
        />
        <Route
          path="/react-burger/forgot-password"
          element={<LogoutUserRoute element={<PasswordForgotPage />} />}
        />
        <Route
          path="/react-burger/reset-password"
          element={<LogoutUserRoute element={<PasswordResetPage />} />}
        />
        <Route
          path="/react-burger/profile/*"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        >
          <Route path="" element={<InfoUserPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;

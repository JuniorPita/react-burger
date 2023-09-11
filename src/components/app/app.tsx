/* Общие импорты */
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getCookie } from "../../utils/cookieFunction";
import { updateUserToken, getUser } from "../../services/actions/user";
import { getIngredients } from "../../services/actions/index";
import { useAppDispatch } from "../../hooks/customHooks";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import LogoutUserRoute from "../logout-user-route/logout-user-route";

/* Компоненты */
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Login from "../../pages/login";
import Registration from "../../pages/registration";
import PasswordForgot from "../../pages/password-forgot";
import PasswordReset from "../../pages/password-reset";
import Profile from "../../pages/profile";
import UserInfo from "../../pages/info-user";
import IngredientsPage from "../../pages/ingredients";
import ErrorPage from "../../pages/not-found";
import Feed from "../../pages/order-feed";
import FeedInfo from "../feed-info/feed-info";
import OrdersUserHistory from "../order-user-history/order-user.history";

const App = () => {
  const dispatch = useAppDispatch();

  const cookie = getCookie("accessToken");
  const userToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && userToken) {
      dispatch(updateUserToken());
    } else if (cookie && userToken) {
      dispatch(getUser());
    }
  }, [cookie, userToken]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/react-burger" element={<Main />}>
          <Route path="ingredients/:id" element={<IngredientsPage />} />
        </Route>
        <Route
          path="/react-burger/login"
          element={<LogoutUserRoute element={<Login />} />}
        />
        <Route
          path="/react-burger/register"
          element={<LogoutUserRoute element={<Registration />} />}
        />
        <Route
          path="/react-burger/forgot-password"
          element={<LogoutUserRoute element={<PasswordForgot />} />}
        />
        <Route
          path="/react-burger/reset-password"
          element={<LogoutUserRoute element={<PasswordReset />} />}
        />
        <Route
          path="/react-burger/profile/*"
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route path="" element={<UserInfo />} />
          <Route path="orders" element={<OrdersUserHistory />}>
            <Route path=":id" element={<FeedInfo />} />
          </Route>
        </Route>
        <Route path="/react-burger/feed" element={<Feed />}>
          <Route path=":id" element={<FeedInfo />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;

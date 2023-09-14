/* Общие импорты */
import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

type TLogoutUser = {
  element: ReactElement;
};

const LogoutUserRoute = ({ element }: TLogoutUser) => {
  const isLogin = localStorage.getItem("refreshToken");

  return !isLogin ? element : <Navigate to="/react-burger" />;
};

export default LogoutUserRoute;

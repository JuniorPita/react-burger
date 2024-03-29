/* Общие импорты */
import { Navigate, useLocation, Location } from "react-router-dom";
import { getCookie } from "../../utils/cookieFunction";
import { ReactElement } from "react";

type TProtectedRouteElement = {
  element: ReactElement;
};

const ProtectedRouteElement = ({ element }: TProtectedRouteElement) => {
  const location: Location = useLocation();
  const isLogin = getCookie("accessToken");

  return isLogin ? (
    element
  ) : (
    <Navigate to="/react-burger/login" state={{ from: location }} />
  );
};

export default ProtectedRouteElement;

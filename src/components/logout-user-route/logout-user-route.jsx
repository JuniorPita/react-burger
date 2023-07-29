/* Общие импорты */
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const LogoutUserRoute = ({ element }) => {
  const isLogin = localStorage.getItem("refreshToken");

  return !isLogin ? element : <Navigate to="/react-burger" />;
};

LogoutUserRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default LogoutUserRoute;

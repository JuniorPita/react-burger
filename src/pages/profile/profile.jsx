/* Общие импорты */
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/actions/user-logout";

/* Стили */
import profilePageStyles from "./profile.module.scss";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logoutUser());
    navigate("/react-burger/login");
  };

  return (
    <div className={profilePageStyles.profilePage}>
      <div className={profilePageStyles.profilePage__navigation}>
        <ul
          className={`text text_type_main-medium ${profilePageStyles.profilePage__navigation_list}`}
        >
          <li className={profilePageStyles.profilePage__navigation_list_item}>
            <NavLink
              end
              to="/react-burger/profile"
              className={({ isActive }) =>
                isActive
                  ? `text text_type_main-medium ${profilePageStyles.profilePage__navigation_list_item_activeLink}`
                  : `text text_type_main-medium ${profilePageStyles.profilePage_navigation_list_item_link}`
              }
            >
              Профиль
            </NavLink>
          </li>

          <li className={profilePageStyles.profilePage__navigation_list_item}>
            <NavLink
              to="/react-burger/profile/orders"
              className={({ isActive }) =>
                isActive
                  ? `text text_type_main-medium ${profilePageStyles.profilePage__navigation_list_item_activeLink}`
                  : `text text_type_main-medium ${profilePageStyles.profilePage_navigation_list_item_link}`
              }
            >
              История заказов
            </NavLink>
          </li>

          <li className={profilePageStyles.profilePage__navigation_list_item}>
            <button
              onClick={handlerLogout}
              className={`text text_type_main-medium ${profilePageStyles.profilePage__navigation_list_item_button}`}
            >
              Выход
            </button>
          </li>
        </ul>

        <p
          className={`text text_type_main-default text_color_inactive ${profilePageStyles.profilePage__navigation_text}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <Outlet />
    </div>
  );
};

export default ProfilePage;

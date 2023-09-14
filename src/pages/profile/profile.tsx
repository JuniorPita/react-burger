/* Общие импорты */
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  Location,
} from "react-router-dom";
import { logoutUser } from "../../services/actions/user";
import { useAppDispatch } from "../../hooks/customHooks";

/* Стили */
import styles from "./profile.module.scss";

/* Статичные строки */
const staticStrings = [
  "Профиль",
  "История заказов",
  "Выход",
  "В этом разделе вы можете изменить свои персональные данные",
];

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const location: Location = useLocation();
  const background: boolean = location.state?.background;

  const handlerLogout = () => {
    dispatch(logoutUser());
    navigate("/react-burger/login");
  };

  return params.id && !background ? (
    <Outlet />
  ) : (
    <div className={styles.profile__content}>
      <div className={styles.profile__navigation}>
        <ul className={`text text_type_main-medium ${styles.profile__list}`}>
          <li className={styles.profile__element}>
            <NavLink
              end
              to="/react-burger/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.profile__activeLink} text text_type_main-medium`
                  : `${styles.profile__link} text text_type_main-medium`
              }
            >
              {staticStrings[0]}
            </NavLink>
          </li>
          <li className={styles.profile__element}>
            <NavLink
              to="/react-burger/profile/orders"
              className={({ isActive }) =>
                isActive
                  ? `${styles.profile__activeLink} text text_type_main-medium`
                  : `${styles.profile__link} text text_type_main-medium`
              }
            >
              {staticStrings[1]}
            </NavLink>
          </li>
          <li className={styles.profile__element}>
            <button
              onClick={handlerLogout}
              className={`${styles.profile__button} text text_type_main-medium`}
            >
              {staticStrings[2]}
            </button>
          </li>
        </ul>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.profile__text}`}
        >
          {staticStrings[3]}
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;

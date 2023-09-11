/* Общие импорты */
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

/* Стили */
import styles from "./app-header.module.scss";

/* Статичные строки */
const staticStrings = ["Конструктор", "Лента заказов", "Личный кабинет"];

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.appHeader__header}>
      <div className={styles.appHeader__container}>
        <div className={styles.appHeader__container_leftContainer}>
          <NavLink
            end
            to="/react-burger"
            className={({ isActive }) =>
              isActive
                ? `${styles.appHeader__activeLink} text text_type_main-default`
                : `${styles.appHeader__link} text text_type_main-default`
            }
          >
            <BurgerIcon
              type={
                location.pathname === "/react-burger" ? "primary" : "secondary"
              }
            />
            {staticStrings[0]}
          </NavLink>
          <NavLink
            to="/react-burger/feed"
            className={({ isActive }) =>
              isActive
                ? `${styles.appHeader__activeLink} text text_type_main-default`
                : `${styles.appHeader__link} text text_type_main-default`
            }
          >
            <ListIcon
              type={
                location.pathname.includes("/react-burger/feed")
                  ? "primary"
                  : "secondary"
              }
            />
            {staticStrings[1]}
          </NavLink>
        </div>

        <div
          className={styles.appHeader__logo}
          onClick={() => navigate("/react-burger")}
        >
          <Logo />
        </div>

        <div className={styles.appHeader__container_rightContainer}>
          <NavLink
            to="react-burger/profile"
            className={({ isActive }) =>
              isActive
                ? `${styles.appHeader__activeLink} text text_type_main-default`
                : `${styles.appHeader__link} text text_type_main-default`
            }
          >
            <ProfileIcon
              type={
                location.pathname.includes("/react-burger/profile")
                  ? "primary"
                  : "secondary"
              }
            />
            {staticStrings[2]}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

/* Общие импорты */
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";

/* Стили */
import appHeaderStyles from "./app-header.module.scss";

/* Статичные строки */
const navStrings = ["Конструктор", "Лента заказов", "Личный кабинет"];

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.nav__list}>
          <li
            className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__firstBlock}`}
          >
            <NavLink
              end
              to="/react-burger"
              className={({ isActive }) =>
                isActive
                  ? `text text_type_main-default ${appHeaderStyles.nav__activeLink}`
                  : `text text_type_main-default ${appHeaderStyles.nav__link}`
              }
            >
              <BurgerIcon
                type={
                  location.pathname === "/react-burger"
                    ? "primary"
                    : "secondary"
                }
              />
              <p className="text text_type_main-default ml-2">
                {navStrings[0]}
              </p>
            </NavLink>
          </li>

          <li
            className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__secondBlock}`}
          >
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              {navStrings[1]}
            </p>
          </li>
        </ul>

        <div
          className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__logo}`}
        >
          <Logo />
        </div>

        <div
          className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__profile}`}
        >
          <NavLink
            end
            to="/react-burger/profile"
            className={({ isActive }) =>
              isActive
                ? `text text_type_main-default ${appHeaderStyles.nav__activeLink}`
                : `text text_type_main-default ${appHeaderStyles.nav__link}`
            }
          >
            <ProfileIcon
              type={
                location.pathname.includes("/react-burger/profile")
                  ? "primary"
                  : "secondary"
              }
            />
            <p className="text text_type_main-default ml-2">{navStrings[2]}</p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

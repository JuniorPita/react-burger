/* Общие импорты */
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

/* Стили */
import appHeaderStyles from "./app-header.module.scss";

/* Статичные строки */
const navStrings = ["Конструктор", "Лента заказов", "Личный кабинет"];

const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.nav__list}>
          <li
            className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__firstBlock}`}
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">{navStrings[0]}</p>
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
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            {navStrings[2]}
          </p>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

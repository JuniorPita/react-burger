import appHeaderStyles from "./app-header.module.scss";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader(): JSX.Element {
  return (
    <div className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.nav__list}>
          <li className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__firstBlock}`}>
            <BurgerIcon type="primary" />
            <p className="text_type_main-default ml-2">Конструктор</p>
          </li>

          <li className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__secondBlock}`}>
            <ListIcon type="secondary" />
            <a href="#" className="text text_type_main-default text_color_inactive ml-2">Лента заказов</a>
          </li>

          <li className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__logo}`}>
            <a href="#">
              <Logo />
            </a>
          </li>

          <li className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__profile}`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppHeader;
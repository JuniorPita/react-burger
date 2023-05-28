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
            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </li>
        </ul>

        <div className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__logo}`}>
          <Logo />
        </div>

        <div className={`${appHeaderStyles.nav__listItem} ${appHeaderStyles.nav__profile}`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
        </div>
      </nav>
    </div>
  );
}

export default AppHeader;
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './app-header.module.css';

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <NavLink end to="/react-burger" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
            <BurgerIcon type={location.pathname === "/react-burger" ? "primary" : "secondary"} />
            Конструктор
          </NavLink>
          <NavLink to="/react-burger/feed" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
            <ListIcon type={location.pathname.includes("/react-burger/feed") ? "primary" : "secondary"} />
            Лента заказов
          </NavLink>
        </div>
        <div className={styles.logo} onClick={() => navigate("/react-burger")}>
          <Logo />
        </div>
        <div className={styles.rightContainer}>
          <NavLink to="react-burger/profile" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
            <ProfileIcon type={location.pathname.includes("/react-burger/profile") ? "primary" : "secondary"} />
            Личный кабинет
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
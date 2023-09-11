import styles from "./profile.module.css";
import { NavLink, Outlet, useLocation, useNavigate, useParams, Location } from 'react-router-dom';
import { logoutUser } from "../services/actions/user";
import { useAppDispatch } from "../hooks/customHooks";

function Profile() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const location: Location = useLocation();
  const background: boolean = location.state?.background;

  const handlerLogout = () => {
    dispatch(logoutUser());
    navigate('/react-burger/login');
  }

  return (params.id && !background) ? 
  (<Outlet />) :
    (<div className={styles.content}>
      <div className={styles.navigation}>
        <ul className={`text text_type_main-medium ${styles.list}`}>
          <li className={styles.element}>
            <NavLink end to="/react-burger/profile" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              Профиль
            </NavLink>
          </li>
          <li className={styles.element}>
            <NavLink to="/react-burger/profile/orders" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              История заказов
            </NavLink>
          </li>
          <li className={styles.element}>
            <button onClick={handlerLogout} className={`${styles.button} text text_type_main-medium`}>
              Выход
            </button>
          </li>
        </ul>
        <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet/>
    </div>
  )
}

export default Profile;
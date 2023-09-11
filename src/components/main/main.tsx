/* Общие импорты */
/* Стили */
/* Компоненты */

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./main.module.scss";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { Outlet, useParams, useLocation, Location } from "react-router-dom";

function Main() {
  const params = useParams();
  const location: Location = useLocation();
  const background: boolean = location.state?.background;

  return params.id && !(location.state && background) ? (
    <Outlet />
  ) : (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}

export default Main;

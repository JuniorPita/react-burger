/* Общие импорты */
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet, useLocation, useParams } from "react-router-dom";

/* Компоненты */
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

/* Стили */
import mainPageStyles from "./main-page.module.scss";

const MainPage = () => {
  const params = useParams();
  const location = useLocation();
  const background = location.state?.background;

  return params.id && !(location.state && background) ? (
    <Outlet />
  ) : (
    <main className={mainPageStyles.mainPage}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default MainPage;

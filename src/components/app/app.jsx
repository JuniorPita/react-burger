/* Общие импорты */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients-action";

/* Стили */
import appStyles from "./app.module.scss";

/* Компоненты */
import AppHeader from "../app-header/app-header";
import MainPage from "../main-page/main-page";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <MainPage />
    </div>
  );
};

export default App;

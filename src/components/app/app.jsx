import { useState, useEffect } from "react";
import appStyles from "./app.module.scss";
import AppHeader from "../app-header/app-header";
import MainPage from "../main-page/main-page";
import getIngredients from "../../utils/burger-api";

const App = () => {
  const [burgerIngredients, setBurgerIngredients] = useState({
    success: false,
    data: [],
  });
  const [error, setError] = useState({
    hasError: null,
    message: null,
  });

  const { success, data } = burgerIngredients;
  const { hasError, message } = error;

  useEffect(() => {
    getIngredients().then((data) => {
      setBurgerIngredients((currentState) => {
        const newState = {
          ...currentState,
          success: data.success,
          data: data.data,
        };

        return newState;
      });

      setError((currentState) => {
        const newState = {
          ...currentState,
          hasError: true,
          message: error.message,
        };

        return newState;
      });
    });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />

      {success && (
        <>
          <MainPage elements={data} />
        </>
      )}

      {!success && hasError && (
        <>
          <div>{message}</div>
        </>
      )}
    </div>
  );
};

export default App;

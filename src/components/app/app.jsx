import { useState, useEffect } from "react";
import appStyles from "./app.module.scss";
import AppHeader from "../app-header/app-header";
import MainPage from "../main-page/main-page";

const App = () => {
  const UrlApiAdress = "https://norma.nomoreparties.space/api/ingredients";
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const getInformation = async () => {
      return await fetch(UrlApiAdress)
        .then((result) => result.json())
        .then((info) => setElements(info.data))
        .catch((error) => new Error(`Уловил ошибку: ${error}`));
    };

    getInformation();
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <MainPage elements={elements} />
    </div>
  );
};

export default App;

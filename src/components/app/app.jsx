import AppStyles from "./app.module.scss";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  return (
    <div className={AppStyles.app}>
      <AppHeader />

      <main className={AppStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;

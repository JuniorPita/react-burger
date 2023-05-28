import AppStyles from './app.module.scss';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={AppStyles.app}>
      <AppHeader />

      <main className={AppStyles.main}>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
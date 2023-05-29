import { useState } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.scss";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import { data } from "../../utils/data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [currentValue, setCurrentValue] = useState("");

  return (
    <section className={burgerIngredientsStyles.burgerIngredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>

      <div className={burgerIngredientsStyles.burgerIngredients__tabs}>
        <Tab
          value="Булки"
          active={currentValue === "bun"}
          onClick={() => setCurrentValue("bun")}
        >
          Булки
        </Tab>

        <Tab
          value="Соусы"
          active={currentValue === "sauce"}
          onClick={() => setCurrentValue("sauce")}
        >
          Соусы
        </Tab>

        <Tab
          value="Начинки"
          active={currentValue === "main"}
          onClick={() => setCurrentValue("main")}
        >
          Начинки
        </Tab>
      </div>

      <div className={burgerIngredientsStyles.burgerIngredients__components}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {data.map((obj) => {
            if (obj.type === "bun") {
              return <BurgerIngredient key={obj._id} {...obj} />;
            }
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {data.map((obj) => {
            if (obj.type === "sauce") {
              return <BurgerIngredient key={obj._id} {...obj} />;
            }
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {data.map((obj) => {
            if (obj.type === "main") {
              return <BurgerIngredient key={obj._id} {...obj} />;
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;

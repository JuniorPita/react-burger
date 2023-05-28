import { useState } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.scss";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import { data } from "../../utils/data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients() {
  const [currentValue, setCurrentValue] = useState("one");

  return (
    <section className={burgerIngredientsStyles.burgerIngredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>

      <div className={burgerIngredientsStyles.burgerIngredients__tabs}>
        <Tab
          value="bun"
          active={currentValue === "bun"}
          onClick={setCurrentValue}
        >
          Булки
        </Tab>

        <Tab
          value="sauce"
          active={currentValue === "sauce"}
          onClick={setCurrentValue}
        >
          Соусы
        </Tab>

        <Tab
          value="main"
          active={currentValue === "main"}
          onClick={setCurrentValue}
        >
          Начинки
        </Tab>
      </div>

      <div className={burgerIngredientsStyles.burgerIngredients__components}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {data.map((object) => {
            if (object.type === "bun") {
              return <BurgerIngredient key={object._id} {...object} />;
            }
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {data.map((object) => {
            if (object.type === "sauce") {
              return <BurgerIngredient key={object._id} {...object} />;
            }
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {data.map((object) => {
            if (object.type === "main") {
              return <BurgerIngredient key={object._id} {...object} />;
            }
          })}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;

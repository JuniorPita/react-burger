import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./burger-ingredients.module.scss";
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = ({ elements }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const productListTitles = ["Булки", "Соусы", "Начинки"];

  const showModalWindow = (element) => {
    setOpenModalWindow(true);
    setCurrentIngredient(element);
  };

  const hideModalWindow = () => {
    setOpenModalWindow(false);
  };

  return (
    <section className={burgerIngredientsStyles.burgerIngredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>

      <div className={burgerIngredientsStyles.burgerIngredients__tabs}>
        <Tab
          value="Булки"
          active={currentValue === "buns"}
          onClick={() => setCurrentValue("buns")}
        >
          {productListTitles[0]}
        </Tab>

        <Tab
          value="Соусы"
          active={currentValue === "sauces"}
          onClick={() => setCurrentValue("sauces")}
        >
          {productListTitles[1]}
        </Tab>

        <Tab
          value="Начинки"
          active={currentValue === "fillings"}
          onClick={() => setCurrentValue("fillings")}
        >
          {productListTitles[2]}
        </Tab>
      </div>

      <div className={burgerIngredientsStyles.burgerIngredients__components}>
        <h2 className="text text_type_main-medium mt-10 mb-6">
          {productListTitles[0]}
        </h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {elements.map((object) => {
            if (object.type === "bun") {
              return (
                <BurgerIngredient
                  key={object._id}
                  {...object}
                  openModalWindow={() => showModalWindow(object)}
                />
              );
            }
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">
          {productListTitles[1]}
        </h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {elements.map((object) => {
            if (object.type === "sauce") {
              return (
                <BurgerIngredient
                  key={object._id}
                  {...object}
                  openModalWindow={() => showModalWindow(object)}
                />
              );
            }
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">
          {productListTitles[2]}
        </h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {elements.map((object) => {
            if (object.type === "main") {
              return (
                <BurgerIngredient
                  key={object._id}
                  {...object}
                  openModalWindow={() => showModalWindow(object)}
                />
              );
            }
          })}
        </ul>
      </div>

      {openModalWindow && (
        <Modal onCloseModal={hideModalWindow}>
          <IngredientDetails currentElement={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default BurgerIngredients;

/* Общие импорты */
import { useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../custom-hooks/use-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientInfo,
  deleteIngredientInfo,
} from "../../services/actions/current-ingredient-action";
import { useNavigate } from "react-router-dom";

/* Стили */
import burgerIngredientsStyles from "./burger-ingredients.module.scss";

/* Компоненты */
import BurgerIngredient from "./burger-ingredient/burger-ingredient";
import IngredientDetails from "../details/ingredient-details/ingredient-details";
import Modal from "../modal/modal";

/* Статичные строки */
const productListTitles = ["Булки", "Соусы", "Начинки"];

const BurgerIngredients = () => {
  const { isModalOpened, openModalWindow, closeModalWindow } = useModal();

  const ingredients = useSelector((store) => store.ingredients.data);
  const [currentValue, setCurrentValue] = useState("");

  const containerRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const fillingsRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const showModalWindow = (element) => {
    dispatch(getIngredientInfo(element));
    openModalWindow();
  };

  const hideModalWindow = () => {
    dispatch(deleteIngredientInfo());
    closeModalWindow();
    navigate("/react-burger");
  };

  const scrollHandling = () => {
    if (
      containerRef.current.getBoundingClientRect().top >
      bunsRef.current.getBoundingClientRect().top
    ) {
      setCurrentValue("bun");
    }

    if (
      containerRef.current.getBoundingClientRect().top >
      saucesRef.current.getBoundingClientRect().top
    ) {
      setCurrentValue("sauce");
    }

    if (
      containerRef.current.getBoundingClientRect().top >
      fillingsRef.current.getBoundingClientRect().top
    ) {
      setCurrentValue("main");
    }
  };

  const setTab = (state, element) => {
    element.current.scrollIntoView({ behaviour: "smooth" });
  };

  const buns = ingredients.filter((ingredient) => ingredient.type === "bun");
  const mains = ingredients.filter((ingredient) => ingredient.type === "main");
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );

  return (
    <section className={burgerIngredientsStyles.burgerIngredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>

      <div className={burgerIngredientsStyles.burgerIngredients__tabs}>
        <Tab
          value="Булки"
          active={currentValue === "bun"}
          onClick={(event) => {
            setTab(event, bunsRef);
          }}
          id={"bun"}
        >
          {productListTitles[0]}
        </Tab>

        <Tab
          value="Соусы"
          active={currentValue === "sauce"}
          onClick={(event) => {
            setTab(event, saucesRef);
          }}
          id={"sauce"}
        >
          {productListTitles[1]}
        </Tab>

        <Tab
          value="Начинки"
          active={currentValue === "main"}
          onClick={(event) => {
            setTab(event, fillingsRef);
          }}
          id={"main"}
        >
          {productListTitles[2]}
        </Tab>
      </div>

      <div
        className={burgerIngredientsStyles.burgerIngredients__components}
        ref={containerRef}
        onScroll={scrollHandling}
      >
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>
          {productListTitles[0]}
        </h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {buns.map((bun) => {
            return (
              <BurgerIngredient
                key={bun._id}
                {...bun}
                openModalWindow={() => showModalWindow(bun)}
              />
            );
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
          {productListTitles[1]}
        </h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {sauces.map((sauce) => {
            return (
              <BurgerIngredient
                key={sauce._id}
                {...sauce}
                openModalWindow={() => showModalWindow(sauce)}
              />
            );
          })}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6" ref={fillingsRef}>
          {productListTitles[2]}
        </h2>
        <ul
          className={burgerIngredientsStyles.burgerIngredients__components_list}
        >
          {mains.map((main) => {
            return (
              <BurgerIngredient
                key={main._id}
                {...main}
                openModalWindow={() => showModalWindow(main)}
              />
            );
          })}
        </ul>
      </div>

      {isModalOpened && (
        <Modal onCloseModal={hideModalWindow}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;

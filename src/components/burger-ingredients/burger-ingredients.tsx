/* Общие импорты */
import {
  getDetailsIngredient,
  deleteDetailsIngredient,
} from "../../services/actions";
import { useModal } from "../../hooks/useModal";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/customHooks";
import { TIngredient } from "../../services/types/types";
import { useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

/* Стили */
import styles from "./burger-ingredients.module.scss";

/* Компоненты */
import Ingredient from "../ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

/* Статичные строки */
const staticStrings = ["Соберите бургер", "Булки", "Соусы", "Начинки"];

const BurgerIngredients = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredients = useAppSelector((store) => store.ingredients.data);

  const [current, setCurrent] = useState("bun");
  const container = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const navigate: NavigateFunction = useNavigate();

  const dispatch = useAppDispatch();

  const showModal = (element: TIngredient) => {
    dispatch(getDetailsIngredient(element));
    openModal();
  };

  const hideModal = () => {
    dispatch(deleteDetailsIngredient());
    closeModal();
    navigate("/react-burger");
  };

  const handleScroll = () => {
    if (
      container.current?.getBoundingClientRect().top! >
      bunsRef.current?.getBoundingClientRect().top!
    ) {
      setCurrent("bun");
    }
    if (
      container.current?.getBoundingClientRect().top! >
      saucesRef.current?.getBoundingClientRect().top!
    ) {
      setCurrent("sauce");
    }
    if (
      container.current?.getBoundingClientRect().top! >
      mainRef.current?.getBoundingClientRect().top!
    ) {
      setCurrent("main");
    }
  };

  const setTab = (
    state: string,
    element: React.RefObject<HTMLHeadingElement>
  ) => {
    element.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (ingredients === null) {
    return <div></div>;
  }
  return (
    <div>
      <h1 className="text text_type_main-large mb-5 mt-10">
        {staticStrings[0]}
      </h1>
      <div className={styles.burgerIngredients__tabs}>
        <div id={"bun"}>
          <Tab
            value="bun"
            active={current === "bun"}
            onClick={(e) => {
              setTab(e, bunsRef);
            }}
          >
            {staticStrings[1]}
          </Tab>
        </div>
        <div id={"sauce"}>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={(e) => {
              setTab(e, saucesRef);
            }}
          >
            {staticStrings[2]}
          </Tab>
        </div>
        <div id={"main"}>
          <Tab
            value="main"
            active={current === "main"}
            onClick={(e) => {
              setTab(e, mainRef);
            }}
          >
            {staticStrings[3]}
          </Tab>
        </div>
      </div>
      <div
        className={styles.burgerIngredients__components}
        ref={container}
        onScroll={handleScroll}
        data-cy="ingredients-menu"
      >
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>
          {staticStrings[1]}
        </h2>
        <ul className={styles.burgerIngredients__listElements}>
          {ingredients.map((obj) => {
            if (obj.type === "bun") {
              return (
                <Ingredient
                  key={obj._id}
                  ingredient={obj}
                  openModal={() => showModal(obj)}
                />
              );
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>
          {staticStrings[2]}
        </h2>
        <ul className={styles.burgerIngredients__listElements}>
          {ingredients.map((obj) => {
            if (obj.type === "sauce") {
              return (
                <Ingredient
                  key={obj._id}
                  ingredient={obj}
                  openModal={() => showModal(obj)}
                />
              );
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>
          {staticStrings[3]}
        </h2>
        <ul className={styles.burgerIngredients__listElements}>
          {ingredients.map((obj) => {
            if (obj.type === "main") {
              return (
                <Ingredient
                  key={obj._id}
                  ingredient={obj}
                  openModal={() => showModal(obj)}
                />
              );
            }
          })}
        </ul>
      </div>

      {isModalOpen && (
        <Modal onClosePopup={hideModal}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;

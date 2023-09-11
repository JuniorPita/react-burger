import { useState, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.scss";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  setOrder,
  ADD_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
} from "../../services/actions";
import BurgerConstructorSorted from "../burger-constructor-sorted/burger-constructor-sorted";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/customHooks";
import { TConstructorIngredient } from "../../services/types/types";

function BurgerConstructor() {
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const ingredients = useAppSelector(
    (store) => store.burgerIngredients.ingredients
  ); // ингредиенты из стора
  const bun = useAppSelector((store) => store.burgerIngredients.bun); // булки из стора
  const buns = bun.slice(bun.length - 1); // оставляем в массиве только последний элемент
  const numberOrder = useAppSelector((store) => store.numberOrder.order); // номер заказа из стора
  const burger = [...buns, ...ingredients, ...buns];
  const loader = useAppSelector((store) => store.numberOrder.loading);

  useEffect(() => {
    checkBurger();
  }, [burger]);

  const checkBurger = () => {
    if (bun.length > 0 && ingredients.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TConstructorIngredient) {
      if (item.ingredient.type === "bun") {
        dispatch({
          type: ADD_BUN,
          data: item.ingredient,
        });
      } else {
        addIngredient(item);
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const outlineColor = isHover ? "lightgreen" : "#131316";

  const addIngredient = (data: TConstructorIngredient) => {
    const uuid = uuidv4();
    dispatch({
      type: ADD_INGREDIENT,
      data: data.ingredient,
      uuid: uuid,
    });
    checkBurger();
  };

  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      dispatch({
        type: MOVE_INGREDIENT,
        itemFrom: dragIndex,
        itemTo: hoverIndex,
      });
    },
    [ingredients]
  );

  const showModal = () => {
    // открыть модальное окно
    dispatch(setOrder(burger.map((item) => item._id)));
    setOpenModal(true);
  };

  const hideModal = () => {
    // скрыть модальное окно
    setOpenModal(false);
  };

  const onClickHandler = () => {
    if (!localStorage.getItem("refreshToken")) {
      navigation("/react-burger/login");
    } else {
      showModal();
      setDisabled(true);
    }
  };

  const numberBun = 0; // индекс из массива булок, чтобы при рендере булки были одинаковыми
  const priceBuns = buns[numberBun]?.price * 2; //цена 2х булок

  const totalPrice =
    ingredients.length > 0 &&
    buns.length > 0 &&
    ingredients
      .reduce((sum, ingredient) => sum + ingredient.price, priceBuns)
      .toString();

  const bunUpper = buns.map((item) => {
    // разметка для верхней булки
    return (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={item.name + "\n(верх)"}
        price={item.price}
        thumbnail={item.image}
      />
    );
  });

  const bunBottom = buns.map((item) => {
    // разметка для нижней булки
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={item.name + "\n(низ)"}
        price={item.price}
        thumbnail={item.image}
      />
    );
  });

  return (
    <div className={styles.content} ref={dropRef} style={{ outlineColor }}>
      <div className={styles.borderElement}>{bunUpper[numberBun]}</div>
      <ul className={styles.list}>
        {ingredients.map((ing, index) => {
          ing.index = index;
          return (
            <li key={ing.uuid} className={styles.element}>
              <BurgerConstructorSorted
                ing={ing}
                index={index}
                moveIngredient={moveIngredient}
              />
            </li>
          );
        })}
      </ul>
      <div className="pl-8 mt-4">{bunBottom[numberBun]}</div>
      <div className={styles.order}>
        <div className={styles.resultSum}>
          {bun.length < 1 ? (
            <p className="text text_type_main-medium">Выберите булку</p>
          ) : ingredients.length < 1 ? (
            <p className="text text_type_main-medium">Выберите начинку</p>
          ) : (
            ""
          )}
          {burger.length > 2 && (
            <>
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <div className={styles.diamond}></div>
            </>
          )}
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            onClickHandler();
          }}
          disabled={disabled}
        >
          Оформить заказ
        </Button>
      </div>

      {openModal && (
        <Modal onClosePopup={hideModal}>
          <OrderDetails numberOrder={numberOrder} loader={loader} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;

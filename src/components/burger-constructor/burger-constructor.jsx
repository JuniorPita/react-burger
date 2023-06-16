/* Общие импорты */
import { useState, useCallback } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useModal } from "../../custom-hooks/use-modal";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  pushOrder,
} from "../../services/actions";

/* Стили */
import burgerConstructorStyles from "./burger-constructor.module.scss";

/* Компоненты */
import Modal from "../modal/modal";
import OrderDetails from "../details/order-details/order-details";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";

/* Статичные строки */
const checkoutOrderTitle = "Оформить заказ";
const emptyOrderTitle = "Перетащите необходимые позиции сюда";

const BurgerConstructor = () => {
  const { isModalOpened, openModalWindow, closeModalWindow } = useModal();
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const bun = useSelector((store) => store.burgerIngredients.bun);
  const buns = bun.slice(bun.length - 1);

  const orderNumber = useSelector((store) => store.orderNumber.order);
  const readyBurgerWithPositions = [...buns, ...ingredients];

  const [disabled, setDisabled] = useState(true);

  const checkReadyBurger = () => {
    if (bun.length < 0 && ingredients.length < 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const addIngredient = (ingredient) => {
    const uuid = uuidv4();

    dispatch({
      type: ADD_INGREDIENT,
      data: ingredient.props,
      uuid: uuid,
    });

    checkReadyBurger();
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: MOVE_INGREDIENT,
        itemFrom: dragIndex,
        itemTo: hoverIndex,
      });
    },
    [dispatch]
  );

  const [{ isHover: isHoverEffect }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.props.type === "bun") {
        dispatch({
          type: ADD_BUN,
          data: item.props,
        });
      } else {
        addIngredient(item, uuidv4());
      }
    },
    collect: (focus) => ({
      isHover: focus.isOver(),
    }),
  });

  const outlineBlockColor = isHoverEffect ? "#90EE90" : "#131316";

  const showModalWindow = () => {
    dispatch(pushOrder(readyBurgerWithPositions.map((item) => item._id)));
    openModalWindow();
  };

  const hideModalWindow = () => {
    closeModalWindow();
  };

  /* Индекс булки, чтобы они были изначально одинаковые (верхняя и нижняя) */
  const numberBun = 0;
  /* Цена за две одинаковые булки */
  const priceBuns = buns[numberBun]?.price * 2;

  const totalPrice =
    ingredients.length > 0 &&
    buns.length > 0 &&
    ingredients
      .reduce((sum, ingredient) => sum + ingredient.price, priceBuns)
      .toString();

  const elementOnTop = buns.map((bun) => {
    return (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    );
  });

  const elementOnBottom = buns.map((bun) => {
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    );
  });

  return (
    <section
      className={burgerConstructorStyles.burgerConstructor}
      ref={dropRef}
      style={{ outlineColor: outlineBlockColor }}
    >
      <div className={burgerConstructorStyles.burgerConstructor__topElement}>
        {elementOnTop[numberBun]}
      </div>

      <ul className={burgerConstructorStyles.burgerConstructor__list}>
        {ingredients.map((ingredient, index) => {
          ingredient.index = index;

          return (
            <li
              className={burgerConstructorStyles.burgerConstructor__list_item}
              key={ingredient.uuid}
            >
              <BurgerConstructorElement
                ingredient={ingredient}
                index={index}
                moveIngredient={moveIngredient}
              />
            </li>
          );
        })}
      </ul>

      <div className="pl-8 mt-4">{elementOnBottom[numberBun]}</div>

      <div className={burgerConstructorStyles.burgerConstructor__order}>
        <div className={burgerConstructorStyles.burgerConstructor__order_info}>
          {readyBurgerWithPositions.length > 0 && (
            <>
              <span className="text text_type_digits-medium">{totalPrice}</span>
              <div
                className={
                  burgerConstructorStyles.burgerConstructor__order_info__icon
                }
              ></div>

              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => {
                  showModalWindow();
                  checkReadyBurger();
                }}
                disabled={disabled}
              >
                {checkoutOrderTitle}
              </Button>
            </>
          )}

          {(readyBurgerWithPositions.length < 0 ||
            // eslint-disable-next-line
            readyBurgerWithPositions == 0) && (
            <>
              <h2
                className={
                  burgerConstructorStyles.burgerConstructor__emptyOrder
                }
              >
                {emptyOrderTitle}
              </h2>
            </>
          )}
        </div>
      </div>

      {isModalOpened && (
        <Modal onCloseModal={hideModalWindow}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;

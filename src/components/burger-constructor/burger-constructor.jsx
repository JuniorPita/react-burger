/* Общие импорты */
import { useState, useCallback, useEffect } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../services/actions/current-ingredient-action";
import { pushOrder } from "../../services/actions/order-action";
import { ADD_BUN } from "../../services/actions/constructor-action";
import { useNavigate } from "react-router-dom";

/* Стили */
import burgerConstructorStyles from "./burger-constructor.module.scss";

/* Компоненты */
import Modal from "../modal/modal";
import OrderDetails from "../details/order-details/order-details";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";

/* Статичные строки */
const checkoutOrderTitle = "Оформить заказ";
const selectBun = "Выберите булку";
const selectFilling = "Выберите начинку";

const BurgerConstructor = () => {
  const [openModal, setOpenedModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const bun = useSelector((store) => store.burgerIngredients.bun);
  const buns = bun.slice(bun.length - 1);

  const orderNumber = useSelector((store) => store.orderNumber.order);
  const readyBurgerWithPositions = [...buns, ...ingredients];

  useEffect(() => {
    checkReadyBurger();
    //eslint-disable-next-line
  }, [readyBurgerWithPositions]);

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
    setOpenedModal(true);
  };

  const hideModalWindow = () => {
    setOpenedModal(false);
  };

  const onClickHandler = () => {
    if (!localStorage.getItem("refreshToken")) {
      navigation("/react-burger/login");
    } else {
      showModalWindow();
      setDisabled(true);
    }
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
          {bun.length < 1 ? (
            <p className="text text_type_main-medium">{selectBun}</p>
          ) : ingredients.length < 2 ? (
            <p className="text text_type_main-medium">{selectFilling}</p>
          ) : (
            ""
          )}

          {readyBurgerWithPositions.length > 2 && (
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
                  onClickHandler();
                }}
                disabled={disabled}
              >
                {checkoutOrderTitle}
              </Button>
            </>
          )}
        </div>
      </div>

      {openModal && (
        <Modal onCloseModal={hideModalWindow}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;

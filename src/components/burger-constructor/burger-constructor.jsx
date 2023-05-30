import { useState } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.scss";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import OrderDetails from "../details/order-details/order-details";

const BurgerConstructor = ({ elements }) => {
  const [openModalWindow, setOpenModalWindow] = useState(false);

  const showModalWindow = () => {
    setOpenModalWindow(true);
  };

  const hideModalWindow = () => {
    setOpenModalWindow(false);
  };

  const filterElementsByType = elements.filter((element) => {
    return element.type === "bun";
  });

  const elementOnTop = filterElementsByType.map((element) => {
    return (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${element.name} (верх)`}
        price={element.price}
        thumbnail={element.image}
      />
    );
  });

  const elementOnBottom = filterElementsByType.map((element) => {
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${element.name} (низ)`}
        price={element.price}
        thumbnail={element.image}
      />
    );
  });

  return (
    <section className={burgerConstructorStyles.burgerConstructor}>
      <div className={burgerConstructorStyles.burgerConstructor__topElement}>
        {elementOnTop[0]}
      </div>

      <ul className={burgerConstructorStyles.burgerConstructor__list}>
        {elements.map((element) => {
          if (element.type !== "bun") {
            return (
              <li
                className={burgerConstructorStyles.burgerConstructor__list_item}
                key={element._id}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </li>
            );
          }
        })}
      </ul>

      <div className="pl-8 mt-4">{elementOnBottom[0]}</div>

      <div className={burgerConstructorStyles.burgerConstructor__order}>
        <div className={burgerConstructorStyles.burgerConstructor__order_info}>
          <span className="text text_type_digits-medium">610</span>
          <div
            className={
              burgerConstructorStyles.burgerConstructor__order_info__icon
            }
          ></div>
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={showModalWindow}
        >
          Оформить заказ
        </Button>
      </div>

      {openModalWindow && (
        <Modal onCloseModal={hideModalWindow}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default BurgerConstructor;

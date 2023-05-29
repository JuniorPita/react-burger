import { data } from "../../utils/data";
import {
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.scss";

const BurgerConstructor = () => {
  return (
    <section className={burgerConstructorStyles.burgerConstructor}>
      <div className={burgerConstructorStyles.burgerConstructor__topElement}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>

      <ul className={burgerConstructorStyles.burgerConstructor__list}>
        {data.map((object) => {
          if (object.type !== "bun") {
            return (
              <li
                key={object._id}
                className={burgerConstructorStyles.burgerConstructor__list_item}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={object.name}
                  price={object.price}
                  thumbnail={object.image}
                />
              </li>
            );
          }
        })}
      </ul>

      <div
        className={`pl-8 mt-4 ${burgerConstructorStyles.burgerConstructor__bottomElement}`}
      >
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[0].name} (низ)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>

      <div className={burgerConstructorStyles.burgerConstructor__order}>
        <div className={burgerConstructorStyles.burgerConstructor__order_info}>
          <span className="text text_type_digits-medium">610</span>
          <div
            className={
              burgerConstructorStyles.burgerConstructor__order_info__icon
            }
          ></div>
        </div>

        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;

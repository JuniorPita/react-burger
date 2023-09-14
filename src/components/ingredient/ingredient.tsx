/* Общие импорты */
import { useDrag } from "react-dnd/dist/hooks";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useMatch } from "react-router-dom";
import { useAppSelector } from "../../hooks/customHooks";
import { TIngredient } from "../../services/types/types";

/* Стили */
import styles from "./ingredient.module.scss";

type TIngredientProps = {
  ingredient: TIngredient;
  openModal: Function;
};

const Ingredient = ({ ingredient, openModal }: TIngredientProps) => {
  const { name, price, image, _id, type } = ingredient;
  const navigate = useNavigate();
  const match = useMatch("ingredients/:id");
  const { id } = match?.params || {};

  let countIngredients = useAppSelector(
    (store) =>
      store.burgerIngredients.ingredients.filter((ing) => ing._id === _id)
        .length
  );
  const bun = useAppSelector((store) => store.burgerIngredients.bun);
  const buns = bun.slice(bun.length - 1);
  let countBun = buns.filter((ing) => ing._id === _id).length * 2;

  const count = type === "bun" ? countBun : countIngredients;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
  });

  return (
    <li
      className={styles.ingredient__element}
      onClick={() => {
        if (id !== _id) {
          navigate(`/react-burger/ingredients/${_id}`, {
            state: { background: true },
          });
        }
        openModal();
      }}
      draggable
      ref={dragRef}
    >
      {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={image} alt={name} />
      <div className={styles.ingredient__price}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={
          "text text_type_main-default pb-8" + " " + styles.ingredient__title
        }
      >
        {name}
      </p>
    </li>
  );
};

export default Ingredient;

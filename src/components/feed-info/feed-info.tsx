/* Общие импорты */
/* Стили */
/* Компоненты */

import styles from "./feed-info.module.scss";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { diffToString, diffDays } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useParams, Location } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/customHooks";
import { TIngredient, TOrder } from "../../services/types/types";

function FeedInfo() {
  const { id } = useParams<{ id: string }>();
  const location: Location = useLocation();
  const checkLocation = location.pathname.includes("feed");
  const [order, setOrder] = useState<TOrder | null>(null);
  const orders = useAppSelector((store) => store.wsFeed.orders);
  const ordersUser = useAppSelector((store) => store.wsFeedUser.orders);

  const ordersCurrent = checkLocation === true ? orders : ordersUser;

  useEffect(() => {
    setOrder(ordersCurrent.find((order) => order._id === id) || null);
  }, [id, ordersCurrent]);

  const ingredients = useAppSelector((store) => store.ingredients.data); // все ингредиенты с сервера

  if (order) {
    const status = order.status === "done" ? "Выполнен" : "Готовится";
    const orderDate = new Date(Date.parse(order.createdAt));
    const todayDate = new Date();
    const diffDate = diffDays(orderDate, todayDate);
    const orderMinutes =
      orderDate.getMinutes().toString().length < 2
        ? `0${orderDate.getMinutes()}`
        : orderDate.getMinutes();

    const totalPrice = (burger: string[]) => {
      let sum = 0;
      burger.forEach((ing) => {
        if (ing !== null) {
          sum += ingredients?.find((el) => el._id === ing)?.price ?? 0;
        }
      });
      return sum;
    };

    const countDublicate = (arr: string[]): { [key: string]: number } => {
      const counts: { [key: string]: number } = {};
      arr.forEach((el) => {
        const item = el;
        counts[item] = counts[item] ? counts[item] + 1 : 1;
      });
      const duplicates: { [key: string]: number } = {};
      for (const item in counts) {
        if (counts[item] >= 1) {
          duplicates[item] = counts[item];
        }
      }
      return duplicates;
    };

    const ingredientsSorted = countDublicate(order.ingredients);
    const orderSorted = Object.keys(ingredientsSorted);
    const countSorted = Object.values(ingredientsSorted);

    return (
      <div className={styles.container}>
        <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
          #{order.number}
        </p>
        <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
        <p className={`text text_type_main-default mb-15 ${styles.status}`}>
          {status}
        </p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <ul className={styles.list}>
          {orderSorted.map((ing, i) => {
            const price = ingredients?.find(
              (el: TIngredient) => el._id === ing
            )?.price;
            return (
              <li key={uuidv4()} className={styles.ingredients}>
                <div className={styles.ingredientInfo}>
                  <img
                    src={
                      ingredients?.find((el: TIngredient) => el._id === ing)
                        ?.image_mobile
                    }
                    alt={
                      ingredients?.find((el: TIngredient) => el._id === ing)
                        ?.name
                    }
                    className={styles.image}
                  />
                  <p className={`${styles.text} text text_type_main-default`}>
                    {
                      ingredients?.find((el: TIngredient) => el._id === ing)
                        ?.name
                    }
                  </p>
                </div>
                <div className={`${styles.priceIngredient}`}>
                  <p className="text text_type_digits-default">{`${countSorted[i]} x ${price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.bottom}>
          <p className="text text_type_main-default text_color_inactive">
            {`${diffToString(diffDate)}, ${orderDate.getHours()}:${orderMinutes}
            i-GMT${
              orderDate.getTimezoneOffset() > 0
                ? `+${orderDate.getTimezoneOffset() / 60}`
                : orderDate.getTimezoneOffset() / 60
            }`}
          </p>
          <div className={styles.price}>
            <p className="text text_type_digits-default">
              {totalPrice(order.ingredients)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}

export default FeedInfo;

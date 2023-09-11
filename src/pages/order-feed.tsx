import { useEffect, useMemo } from "react";
import styles from "./order-feed.module.scss";
import {
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_START,
} from "../services/actions/websocket";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  Location,
} from "react-router-dom";
import { useModal } from "../hooks/useModal";
import Modal from "../components/modal/modal";
import FeedInfo from "../components/feed-info/feed-info";
import { diffToString, diffDays } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";

function Feed() {
  const params = useParams();
  const location: Location = useLocation();
  const background: boolean = location.state?.background;

  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector((store) => store.wsFeed);
  const ingredients = useAppSelector((store) => store.ingredients.data); // все ингредиенты

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION,
      });
    };
  }, []);

  const hideModal = () => {
    closeModal();
    navigate("/react-burger/feed");
  };

  const ordersDone = useMemo(
    () => orders.filter((item) => item.status === "done"),
    [orders]
  );

  const OrdersPending = useMemo(
    () => orders.filter((item) => item.status !== "done"),
    [orders]
  );

  const getIngredientPrice = (ing: string) => {
    const ingredient = ingredients?.find((el) => el._id === ing);
    return ingredient ? ingredient.price : 0;
  };

  const totalPrice = (burger: string[]) => {
    let sum = 0;
    burger.forEach((ing) => {
      if (ing !== null) {
        sum += getIngredientPrice(ing);
      }
    });
    return sum;
  };

  return params.id && !background ? (
    <Outlet />
  ) : (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large ${styles.title}`}>
        Лента заказов
      </h2>
      <div className={styles.box}>
        <div className={styles.leftContainer}>
          <ul className={styles.list}>
            {orders.map((order) => {
              const _id = order._id;
              const orderDate = new Date(Date.parse(order.createdAt));
              const todayDate = new Date();
              const diffDate = diffDays(orderDate, todayDate);
              const orderMinutes =
                orderDate.getMinutes().toString().length < 2
                  ? `0${orderDate.getMinutes()}`
                  : orderDate.getMinutes();

              return (
                <li
                  className={styles.orderElement}
                  key={uuidv4()}
                  onClick={() => {
                    navigate(`/react-burger/feed/${_id}`, {
                      state: { background: true },
                    });
                    openModal();
                  }}
                >
                  <div className={`${styles.infoOrder} mb-6`}>
                    <p className="text text_type_digits-default">
                      #{order.number}
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                      {`${diffToString(
                        diffDate
                      )}, ${orderDate.getHours()}:${orderMinutes}
                      i-GMT${
                        orderDate.getTimezoneOffset() > 0
                          ? `+${orderDate.getTimezoneOffset() / 60}`
                          : orderDate.getTimezoneOffset() / 60
                      }`}
                    </p>
                  </div>
                  <h2 className="text text_type_main-medium mb-6">
                    {order.name}
                  </h2>
                  <div className={styles.containerIngredients}>
                    <ul className={styles.ingredients}>
                      {order.ingredients.map((ingredient, index) => {
                        if (ingredient !== null) {
                          if (index > 0 && index <= 5) {
                            return (
                              <li
                                key={uuidv4()}
                                style={{ zIndex: index }}
                                className={styles.imgElement}
                              >
                                <img
                                  src={
                                    ingredients?.find(
                                      (el) => el._id === ingredient
                                    )?.image_mobile
                                  }
                                  alt={
                                    ingredients?.find(
                                      (el) => el._id === ingredient
                                    )?.name
                                  }
                                  className={styles.image}
                                />
                              </li>
                            );
                          }
                          if (order.ingredients.length > 5) {
                            if (index === 0) {
                              return (
                                <li
                                  key={uuidv4()}
                                  style={{ zIndex: index }}
                                  className={`${styles.imgElement} ${styles.last}`}
                                >
                                  <p className={`${styles.text}`}>
                                    +{order.ingredients.length - 5}
                                  </p>
                                  <img
                                    src={
                                      ingredients?.find(
                                        (el) => el._id === ingredient
                                      )?.image_mobile
                                    }
                                    alt={
                                      ingredients?.find(
                                        (el) => el._id === ingredient
                                      )?.name
                                    }
                                    className={styles.image}
                                  />
                                </li>
                              );
                            }
                          }
                        }
                      })}
                    </ul>
                    <div className={styles.price}>
                      <p className="text text_type_digits-default">
                        {totalPrice(order.ingredients)}
                      </p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.orders}>
            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
            <ul
              className={`${styles.ordersDone} text text_type_digits-default`}
            >
              {ordersDone.slice(0, 21).map((item) => {
                return (
                  <li
                    className={`${styles.elementList} ${styles.color}`}
                    key={item.number}
                  >
                    {item.number}
                  </li>
                );
              })}
            </ul>
            <ul
              className={`${styles.ordersDone} text text_type_digits-default`}
            >
              {OrdersPending.slice(0, 21).map((item) => {
                return (
                  <li className={`${styles.elementList}`} key={item.number}>
                    {item.number}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="text text_type_main-medium">
              Выполнено за все время:
            </h2>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div>
            <h2 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h2>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClosePopup={hideModal}>
          <FeedInfo />
        </Modal>
      )}
    </div>
  );
}

export default Feed;

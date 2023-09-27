/* Общие импорты */
import { useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  WS_CLOSE_CONNECTION_USER,
  WS_CONNECTION_START_USER,
} from "../../services/actions/webSocketUser";
import { getCookie } from "../../utils/cookieFunction";
import { diffToString, diffDays } from "../../utils";
import { useModal } from "../../hooks/useModal";
import {
  useLocation,
  useNavigate,
  useParams,
  Outlet,
  Location,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/customHooks";

/* Стили */
import styles from "./order-history-information.module.scss";

/* Компоненты */
import Modal from "../modal/modal";
import FeedInfo from "../feed/feed";

const OrdersUserHistory = () => {
  const params = useParams();
  const location: Location = useLocation();
  const background: boolean = location.state?.background;

  const dispatch = useAppDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const orders = useAppSelector((store) => store.wsFeedUser.orders);
  const authUser = useAppSelector((store) => store.user.authorizedUser);
  const ingredients = useAppSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_USER,
      payload: getCookie("accessToken"),
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION_USER,
      });
    };
  }, [authUser]);

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

  const hideModal = () => {
    closeModal();
    navigate("/react-burger/profile/orders");
  };

  return params.id && !background ? (
    <Outlet />
  ) : (
    <div className={styles.orderUser__container}>
      <ul className={styles.orderUser__list}>
        {orders.map((order) => {
          const _id = order._id;
          const status =
            order.status === "done"
              ? "Выполнен"
              : order.status === "pending"
              ? "Готовится"
              : "Создан";
          const orderDate = new Date(Date.parse(order.createdAt));
          const todayDate = new Date();
          const diffDate = diffDays(orderDate, todayDate);
          const orderMinutes =
            orderDate.getMinutes().toString().length < 2
              ? `0${orderDate.getMinutes()}`
              : orderDate.getMinutes();
          return (
            <li
              className={styles.orderUser__element}
              key={_id}
              onClick={() => {
                navigate(`/react-burger/profile/orders/${_id}`, {
                  state: { background: true },
                });
                openModal();
              }}
            >
              <div className={styles.orderUser__header}>
                <p className="text text_type_digits-default mb-6">
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
              <p className="text text_type_main-medium mb-2">{order.name}</p>
              <p
                className={
                  status === "Выполнен"
                    ? `${styles.orderUser__color} text text_type_main-default mb-6`
                    : "text text_type_main-default mb-6"
                }
              >
                {status}
              </p>
              <div className={styles.orderUser__footer}>
                <ul className={styles.orderUser__ingredients}>
                  {order.ingredients.map((ingredient, index) => {
                    if (ingredient !== null) {
                      if (index > 0 && index <= 5) {
                        return (
                          <li
                            key={index}
                            style={{ zIndex: index }}
                            className={styles.orderUser__ingredient}
                          >
                            <img
                              src={
                                ingredients?.find((el) => el._id === ingredient)
                                  ?.image_mobile
                              }
                              alt={
                                ingredients?.find((el) => el._id === ingredient)
                                  ?.name
                              }
                              className={styles.orderUser__image}
                            />
                          </li>
                        );
                      }
                      if (order.ingredients.length > 5) {
                        if (index === 0) {
                          return (
                            <li
                              key={index}
                              style={{ zIndex: index }}
                              className={`${styles.orderUser__ingredient} ${styles.orderUser__last}`}
                            >
                              <p className={`${styles.orderUser__text}`}>
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
                                className={styles.orderUser__image}
                              />
                            </li>
                          );
                        }
                      }
                    }
                  })}
                </ul>
                <div className={styles.orderUser__price}>
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

      {isModalOpen && (
        <Modal onClosePopup={hideModal}>
          <FeedInfo />
        </Modal>
      )}
    </div>
  );
};

export default OrdersUserHistory;

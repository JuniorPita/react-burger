/* Стили */
import styles from "./order-details.module.scss";

/* Компоненты */
import Loader from "../loader/loader";

/* Статичные строки */
const staticStrings = [
  "идентификатор заказа",
  "Ваш заказ начали готовить",
  "Дождитесь готовности на орбитальной станции",
];

type TOrderDetails = {
  numberOrder: number;
  loader: boolean;
};

const OrderDetails = ({ numberOrder, loader }: TOrderDetails) => {
  return (
    <div className={styles.orderDetails__container}>
      {loader ? (
        <Loader />
      ) : (
        <p className="text text_type_digits-large">{numberOrder}</p>
      )}
      <p className="text text_type_main-medium mt-8 mb-15">
        {staticStrings[0]}
      </p>
      <div className={styles.orderDetails__icon}></div>
      <p className="text text_type_main-default mt-15 mb-2">
        {staticStrings[1]}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {staticStrings[2]}
      </p>
    </div>
  );
};

export default OrderDetails;

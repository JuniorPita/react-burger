/* Общие импорты */
/* Стили */
/* Компоненты */

import Loader from "../loader/loader";
import styles from "./order-details.module.scss";

type TOrderDetails = {
  numberOrder: number;
  loader: boolean;
};

function OrderDetails({ numberOrder, loader }: TOrderDetails) {
  return (
    <div className={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <p className="text text_type_digits-large">{numberOrder}</p>
      )}
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <div className={styles.icon}></div>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
export default OrderDetails;

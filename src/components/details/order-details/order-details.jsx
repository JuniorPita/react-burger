/* Общие импорты */
import PropTypes from "prop-types";

/* Стили */
import orderDetailsStyles from "./order-details.module.scss";

/* Статичные строки */
const orderIdTitle = "Идентификатор заказа";
const orderStatusTitle = "Ваш заказ начали готовить";
const orderDescriptionTitle = "Дождитесь готовности на орбитальной станции";

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={orderDetailsStyles.orderDetails}>
      <span className="text text_type_digits-large">{orderNumber}</span>
      <span className="text text_type_main-medium mt-8 mb-15">
        {orderIdTitle}
      </span>
      <div className={orderDetailsStyles.orderDetails__icon}></div>
      <p className="text text_type_main-default mt-15 mb-2">
        {orderStatusTitle}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {orderDescriptionTitle}
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};

export default OrderDetails;

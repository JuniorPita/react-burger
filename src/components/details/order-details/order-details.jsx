import orderDetailsStyles from "./order-details.module.scss";

const OrderDetails = () => {
  return (
    <div className={orderDetailsStyles.orderDetails}>
      <span className="text text_type_digits-large">034536</span>
      <span className="text text_type_main-medium mt-8 mb-15">
        Идентификатор заказа
      </span>
      <div className={orderDetailsStyles.orderDetails__icon}></div>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;

import React, { FC } from "react";
import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderDetailsProps {
  orderNumber: number | null;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div className={styles.order_container}>
      <p className={`text text_type_digits-large ${styles.order_number}`}>
        {orderNumber}
      </p>
      <p className={`text text_type_main-small ${styles.id_caption}`}>
        идентификатор заказа
      </p>
      <div className={styles.checkmarck_container}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={`text text_type_main-small ${styles.order_process}`}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};


export default OrderDetails;

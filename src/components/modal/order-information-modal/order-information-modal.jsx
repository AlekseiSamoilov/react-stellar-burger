import Modal from "../modal";
import OrderInformation from "../order-information/order-information";

const OrderInformationModal = ({ order }) => {
  return (
    <Modal>
      <OrderInformation order={order} />
    </Modal>
  );
};

export default OrderInformationModal;

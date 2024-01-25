import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import OrderInformation from "../order-information/order-information";
import { IOrdersDetails } from "../../../services/types/data";

interface IOrderInformationModalProps {
  order: IOrdersDetails;
}

const OrderInformationModal: React.FC<IOrderInformationModalProps> = ({
  order,
}) => {
  const navigate = useNavigate();
    const closeModal = () => {
      navigate(-1)
    }

  return (
    <Modal closeModal={closeModal}>
      <OrderInformation order={order} />
    </Modal>
  );
};

export default OrderInformationModal;

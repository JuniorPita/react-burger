/* Общие импорты */
import PropTypes from "prop-types";

/* Стили */
import modalOverlayStyles from "./modal-overlay.module.scss";

const ModalOverlay = ({ onCloseModal }) => {
  return (
    <div
      className={modalOverlayStyles.modalOverlay}
      onClick={onCloseModal}
    ></div>
  );
};

ModalOverlay.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default ModalOverlay;

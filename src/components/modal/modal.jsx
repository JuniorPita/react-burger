import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.scss";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const Modal = ({ children, onCloseModal }) => {
  const modalBox = document.getElementById("modalbox");

  useEffect(() => {
    const closeByEscKeyButton = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        onCloseModal();
      }
    };

    document.addEventListener("keydown", closeByEscKeyButton);

    return () => {
      document.removeEventListener("keydown", closeByEscKeyButton);
    };
  }, []);

  return createPortal(
    <ModalOverlay onCloseModal={onCloseModal}>
      <div
        className={modalStyles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={modalStyles.modal__btnClose} onClick={onCloseModal}>
          <CloseIcon type="primary" />
        </button>

        {children}
      </div>
    </ModalOverlay>,
    modalBox
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;

/* Общие импорты */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TModal } from "../../services/types/types";

/* Стили */
import styles from "./modal.module.scss";

/* Компоненты */
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

const Modal = ({ children, onClosePopup }: TModal) => {
  useEffect(() => {
    const closeByEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClosePopup();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, []);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClosePopup={onClosePopup}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        data-cy="modal-wrapper"
      >
        <button
          className={styles.modal__buttonClose}
          onClick={onClosePopup}
          data-cy="modal-close-button"
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;

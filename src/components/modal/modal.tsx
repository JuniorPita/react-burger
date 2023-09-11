import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { TModal } from "../../services/types/types";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

function Modal({ children, onClosePopup }: TModal) {

  useEffect(() => {
    const closeByEsc = (event: KeyboardEvent) => {
      if(event.key === "Escape") {
        onClosePopup();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => {
      document.removeEventListener("keydown", closeByEsc);
    }
  }, []);

  if(!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClosePopup={onClosePopup}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.buttonClose} onClick={onClosePopup}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

export default Modal;
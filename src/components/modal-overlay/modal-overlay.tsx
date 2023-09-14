/* Общие импорты */
import { TModal } from "../../services/types/types";

/* Стили */
import styles from "./modal-overlay.module.scss";

const ModalOverlay = ({ children, onClosePopup }: TModal) => {
  return (
    <div className={styles.overlay} onClick={onClosePopup}>
      {children}
    </div>
  );
};

export default ModalOverlay;

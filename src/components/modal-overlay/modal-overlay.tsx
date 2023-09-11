import { TModal } from "../../services/types/types";
import styles from "./modal-overlay.module.css";

function ModalOverlay({ children, onClosePopup }: TModal) {

  return (
    <div className={styles.overlay} onClick={onClosePopup}>
      {children}
    </div>
  )
}

export default ModalOverlay;
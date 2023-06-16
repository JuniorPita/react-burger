/* Общие импорты */
import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModalWindow = useCallback(() => {
    setIsModalOpened(true);
  }, []);
  const closeModalWindow = useCallback(() => {
    setIsModalOpened(false);
  }, []);

  return {
    isModalOpened: isModalOpened,
    openModalWindow: openModalWindow,
    closeModalWindow: closeModalWindow,
  };
};

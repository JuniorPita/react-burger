/* Общие импорты */
import { useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";

export const useModal = () => {
  const params = useParams();
  const location = useLocation();
  const background = params.id && location.state && location.state.background;

  const [isModalOpened, setIsModalOpened] = useState(background || false);

  const openModalWindow = useCallback(() => {
    setIsModalOpened(true);
  }, []);

  const closeModalWindow = useCallback(() => {
    setIsModalOpened(false);
  }, []);

  return {
    isModalOpened,
    openModalWindow,
    closeModalWindow,
  };
};

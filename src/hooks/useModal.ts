import { useState, useCallback } from "react";
import { useLocation, useParams, Location } from 'react-router-dom';

export const useModal = () => {

  const params = useParams();
  const location: Location = useLocation();
  const background: boolean | string = params.id && location.state && location.state.background;

  const [isModalOpen, setIsModalOpen] = useState(background || false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

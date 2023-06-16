/* Общие импорты */
import { checkResponse } from "../../components/utils/check-response";

/* Общий URL для получения данных */
const UrlAdress = "https://norma.nomoreparties.space/api";

export const requestForActions = async (url, options) => {
  const res = await fetch(`${UrlAdress}/${url}`, options);

  return checkResponse(res);
};

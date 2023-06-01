import checkResponse from "./check-response";

const getIngredients = async () => {
  try {
    const urlApiForBurgers =
      "https://norma.nomoreparties.space/api/ingredients";
    const result = await fetch(urlApiForBurgers).then(checkResponse);

    return result;
  } catch (error) {
    throw new Error(`Возникла ошибка: ${error}`);
  }
};

export default getIngredients;

import checkResponse from "./check-response";

const getIngredients = async () => {
  const urlApiForBurgers = "https://norma.nomoreparties.space/api/ingredients";

  const result = await fetch(urlApiForBurgers);

  checkResponse(result);

  const burgerIngredients = await result.json();

  return burgerIngredients;
};

export default getIngredients;

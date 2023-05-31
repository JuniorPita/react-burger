const checkResponse = (result) => {
  if (!result.ok) {
    const errorMessage = `Упс, прилетела ошибка: ${result.status}`;

    throw new Error(errorMessage);
  }

  return false;
};

export default checkResponse;

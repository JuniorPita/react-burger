const checkResponse = (result) => {
  return result.ok
    ? result.json()
    : result.json().then((error) => new Promise.reject(error));
};

export default checkResponse;

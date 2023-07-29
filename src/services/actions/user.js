export const SUCCESS_RESET = "SUCCESS_RESET";

export const refreshToken = () => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
};

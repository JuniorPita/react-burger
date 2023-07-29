/* Стили */
import errorPageStyles from "./not-found.module.scss";

const ErrorPage = () => {
  return (
    <div className={errorPageStyles.errorPage}>
      <div className={errorPageStyles.errorPage__img}></div>
      <p
        className={`text_type_main-medium ${errorPageStyles.errorPage__subtitle}`}
      >
        Упс... Страница не найдена!
      </p>
    </div>
  );
};

export default ErrorPage;

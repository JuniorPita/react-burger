/* Общие импорты */
import styles from "./not-found.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.notFound__container}>
      <div className={styles.notFound__image}></div>
      <p className={`${styles.notFound__subtitle} text_type_main-medium`}>
        Упс... Страница не найдена
      </p>
    </div>
  );
};

export default ErrorPage;

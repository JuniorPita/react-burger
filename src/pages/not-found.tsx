import styles from "./not-found.module.scss";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <p className={`${styles.subtitle} text_type_main-medium`}>
        Упс... Страница не найдена
      </p>
    </div>
  );
}

export default ErrorPage;

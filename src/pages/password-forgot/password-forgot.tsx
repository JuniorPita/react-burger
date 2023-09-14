/* Общие импорты */
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { restorePassword } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/customHooks";
import { FormEvent } from "react";

/* Стили */
import styles from "./password-forgot.module.scss";

/* Статичные строки */
const staticStrings = [
  "Восстановление пароля",
  "Восстановить",
  "Вспомнили пароль?",
  "Войти",
];

const PasswordForgot = () => {
  const dispatch = useAppDispatch();
  const isSuccessPost = useAppSelector((store) => store.user.success);

  const { values, handleChange } = useForm();

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(restorePassword(values.email));
  };

  if (isSuccessPost) {
    return <Navigate to="/react-burger/reset-password" />;
  }

  return (
    <form className={styles.passwordForgot__content} onSubmit={handlerSubmit}>
      <h2
        className={`text text_type_main-medium ${styles.passwordForgot__title}`}
      >
        {staticStrings[0]}
      </h2>
      <EmailInput
        placeholder={"Укажите e-mail"}
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.passwordForgot__button}
      >
        {staticStrings[1]}
      </Button>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.passwordForgot__text}`}
      >
        {staticStrings[2]}
        <Link to="/react-burger/login" className={styles.passwordForgot__link}>
          {" "}
          {staticStrings[3]}
        </Link>
      </p>
    </form>
  );
};

export default PasswordForgot;

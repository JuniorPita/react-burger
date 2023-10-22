/* Общие импорты */
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/customHooks";
import { FormEvent } from "react";

/* Стили */
import styles from "./login.module.scss";

const staticStrings = [
  "Вход",
  "Войти",
  "Вы - новый пользователь?",
  "Зарегистрироваться",
  "Забыли пароль?",
  "Восстановить пароль",
];

const Login = () => {
  const { values, handleChange } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSuccessLogin = useAppSelector((store) => store.user.authorizedUser);

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(values.email, values.password));
  };

  if (isSuccessLogin) {
    navigate(-1);
  }

  return (
    <form
      className={styles.login__content}
      onSubmit={handlerSubmit}
      data-cy="login-form"
    >
      <h2 className={`text text_type_main-medium ${styles.login__title}`}>
        {staticStrings[0]}
      </h2>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        extraClass="mt-6"
        data-cy="email-input"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        extraClass="mt-6 mb-6"
        data-cy="password-input"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.login__button}
        data-cy="submit"
      >
        {staticStrings[1]}
      </Button>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.login__text}`}
      >
        {staticStrings[2]}
        <Link
          to="/react-burger/register"
          className={styles.login__link}
          data-cy="go-register-button"
        >
          {" "}
          {staticStrings[3]}
        </Link>
      </p>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.login__text}`}
      >
        {staticStrings[4]}
        <Link to="/react-burger/forgot-password" className={styles.login__link}>
          {" "}
          {staticStrings[5]}
        </Link>
      </p>
    </form>
  );
};

export default Login;

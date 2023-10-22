/* Общие импорты */
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../hooks/customHooks";

/* Стили */
import styles from "./registration.module.scss";

/* Статичные строки */
const staticStrings = [
  "Регистрация",
  "Зарегистрироваться",
  "Уже зарегистрированы?",
  "Войти",
];

const Registration = () => {
  const dispatch = useAppDispatch();
  const inputRefName = useRef<HTMLInputElement>(null);
  const { values, handleChange } = useForm();

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(values.email, values.password, values.name));
  };

  return (
    <form
      className={styles.registration__content}
      onSubmit={handlerSubmit}
      data-cy="register-form"
    >
      <h2
        className={`text text_type_main-medium ${styles.registration__title}`}
      >
        {staticStrings[0]}
      </h2>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        error={false}
        ref={inputRefName}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
        data-cy="name-input"
      />
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
        extraClass={styles.registration__button}
        data-cy="submit"
      >
        {staticStrings[1]}
      </Button>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.registration__text}`}
      >
        {staticStrings[2]}
        <Link
          to="/react-burger/login"
          className={styles.registration__link}
          data-cy="go-login-button"
        >
          {" "}
          {staticStrings[3]}
        </Link>
      </p>
    </form>
  );
};

export default Registration;

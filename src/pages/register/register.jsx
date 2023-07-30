/* Общие импорты */
import { useDispatch } from "react-redux";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useForm } from "../../custom-hooks/use-form";
import { registerUser } from "../../services/actions/user-register";
import { Link } from "react-router-dom";

/* Стили */
import registerPageStyles from "./register.module.scss";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const inputRefName = useRef(null);
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(values.email, values.password, values.name));
  };

  return (
    <form onSubmit={handlerSubmit} className={registerPageStyles.registerPage}>
      <h2
        className={`text text_type_main-medium ${registerPageStyles.registerPage__title}`}
      >
        Регистрация
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
      />

      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        extraClass="mt-6"
      />

      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        extraClass={"mt-6 mb-6"}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={registerPageStyles.registerPage__button}
      >
        Зарегистрироваться
      </Button>

      <p
        className={`text text_type_main-default text_color_inactive ${registerPageStyles.registerPage__text}`}
      >
        Уже зарегистрированы?
        <Link
          to="/react-burger/login"
          className={registerPageStyles.registerPage__text_link}
        >
          Войти
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;

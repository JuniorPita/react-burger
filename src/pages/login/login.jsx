/* Общие импорты */
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../custom-hooks/use-form";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/actions/user-login";

/* Стили */
import loginPageStyles from "./login.module.scss";

const LoginPage = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSuccessLogin = useSelector((store) => store.user.authorizedUser);

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(values.email, values.password));
  };

  if (isSuccessLogin) {
    navigate(-1);
  }

  return (
    <form onSubmit={handlerSubmit} className={loginPageStyles.loginPage}>
      <h2
        className={`text text_type_main-medium ${loginPageStyles.loginPage__title}`}
      >
        Вход
      </h2>

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
        extraClass="mt-6 mb-6"
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={loginPageStyles.loginPage__button}
      >
        Войти
      </Button>

      <p
        className={`text text_type_main-default text_color_inactive ${loginPageStyles.loginPage__text}`}
      >
        Вы - новый пользователь?
        <Link
          to="/react-burger/register"
          className={loginPageStyles.loginPage__text_link}
        >
          Зарегистрироваться
        </Link>
      </p>

      <p
        className={`text text_type_main-default text_color_inactive ${loginPageStyles.loginPage__text}`}
      >
        Забыли пароль?
        <Link
          to="/react-burger/forgot-password"
          className={loginPageStyles.loginPage__text_link}
        >
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;

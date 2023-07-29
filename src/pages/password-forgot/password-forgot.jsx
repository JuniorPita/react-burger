/* Общие импорты */
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../custom-hooks/use-form";
import { restorePassword } from "../../services/actions/user-password";
import { Link, Navigate } from "react-router-dom";

/* Стили */
import passwordForgotPageStyles from "./password-forgot.module.scss";

const PasswordForgotPage = () => {
  const dispatch = useDispatch();
  const isSuccessPost = useSelector((store) => store.user.success);
  const { values, handleChange } = useForm({ email: "" });

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(restorePassword(values.email));
  };

  if (isSuccessPost) {
    return <Navigate to="/react-burger/reset-password" />;
  }

  return (
    <form
      onSubmit={handlerSubmit}
      className={passwordForgotPageStyles.passwordForgotPage}
    >
      <h2
        className={`text text_type_main-medium ${passwordForgotPageStyles.passwordForgotPage__title}`}
      >
        Восстановление пароля
      </h2>

      <EmailInput
        placeholder={"Укажите Ваш Email"}
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
        extraClass={passwordForgotPageStyles.passwordForgotPage__button}
      >
        Восстановить
      </Button>

      <p
        className={`text text_type_main-default text_color_inactive ${passwordForgotPageStyles.passwordForgotPage__text}`}
      >
        Вспомнили пароль?
        <Link
          to="/react-burger/login"
          className={passwordForgotPageStyles.passwordForgotPage__text_link}
        >
          Войти
        </Link>
      </p>
    </form>
  );
};

export default PasswordForgotPage;

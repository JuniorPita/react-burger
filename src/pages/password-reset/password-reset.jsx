/* Общие импорты */
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../custom-hooks/use-form";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SUCCESS_RESET } from "../../services/actions/user";
import { resetPassword } from "../../services/actions/user-password";

/* Стили */
import passwordResetPageStyles from "./password-reset.module.scss";

const PasswordResetPage = () => {
  const dispatch = useDispatch();
  const isSuccessReset = useSelector((store) => store.user.reset);
  const { values, handleChange } = useForm({ password: "", code: "" });

  useEffect(() => {
    dispatch({
      type: SUCCESS_RESET,
    });
    // eslint-disable-next-line
  }, []);

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword(values.password, values.code));
  };

  if (isSuccessReset) {
    return <Navigate to="/react-burger/login" />;
  }

  return (
    <form
      onSubmit={handlerSubmit}
      className={passwordResetPageStyles.passwordResetPage}
    >
      <h2
        className={`text text_type_main-medium ${passwordResetPageStyles.passwordResetPage__title}`}
      >
        Восстановление пароля
      </h2>

      <PasswordInput
        placeholder={"Введите новый пароль"}
        onChange={handleChange}
        value={values.password}
        name={"password"}
        extraClass="mt-6 mb-6"
      />

      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        value={values.code}
        onChange={handleChange}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={passwordResetPageStyles.passwordResetPage__text}
      >
        Сохранить
      </Button>

      <p
        className={`text text_type_main-default text_color_inactive ${passwordResetPageStyles.passwordResetPage__text}`}
      >
        Вспомнили пароль?
        <Link
          to="/react-burger/login"
          className={passwordResetPageStyles.passwordResetPage__text_link}
        >
          Войти
        </Link>
      </p>
    </form>
  );
};

export default PasswordResetPage;

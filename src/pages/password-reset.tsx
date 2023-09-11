import styles from "./password-reset.module.css";
import { useEffect, FormEvent } from "react";
import { Link, Navigate } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SUCCESS_RESET, resetPassword } from "../services/actions/user";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../hooks/customHooks";

function PasswordReset() {

  const dispatch = useAppDispatch();
  const isSuccessReset = useAppSelector(store => store.user.reset);
  const { values, handleChange } = useForm();

  useEffect(() => {
    dispatch({
      type: SUCCESS_RESET
    });
  }, []);

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(values.password, values.code));
  }

  if(isSuccessReset) {
    return <Navigate to="/react-burger/login" />
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
      <PasswordInput
        placeholder={"Введите новый пароль"}
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass="mt-6 mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        value={values.code || ""}
        onChange={handleChange}
        name={'code'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Сохранить
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль? 
        <Link to="/react-burger/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default PasswordReset;
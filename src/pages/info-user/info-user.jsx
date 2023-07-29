/* Общие импорты */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useForm } from "../../custom-hooks/use-form";
import { useModal } from "../../custom-hooks/use-modal";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../services/actions/user-get";
import { patchUser } from "../../services/actions/user-patch";

/* Стили */
import infoUserPageStyles from "./info-user.module.scss";

/* Компоненты */
import Modal from "../../components/modal/modal";

const InfoUserPage = () => {
  const { name, email, success } = useSelector((store) => store.user);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { isModalOpened, openModalWindow, closeModalWindow } = useModal();

  const showModalWindow = () => {
    openModalWindow();
  };

  const hideModalWindow = () => {
    closeModalWindow();
  };

  useEffect(() => {
    dispatch(getUser());
    setValues({ name: name, email: email, password: "" });
    // eslint-disable-next-line
  }, [name, email]);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    inputRef.current.disabled = false;
    inputRef.current.classList.remove("input__textfield-disabled");
  };

  const onBlur = () => {
    inputRef.current.disabled = true;
    inputRef.current.classList.add("input__textfield-disabled");
  };

  const handlerCancel = () => {
    setValues({ name: name, email: email, password: "********" });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(patchUser(values.email, values.name, values.password));

    if (success) {
      showModalWindow();
    }
  };

  return (
    <>
      <form
        onSubmit={handlerSubmit}
        className={infoUserPageStyles.infoUserPage}
      >
        <Input
          onChange={handleChange}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          placeholder={"Имя"}
          icon={"EditIcon"}
          onIconClick={onIconClick}
          ref={inputRef}
          disabled={true}
          onBlur={onBlur}
          extraClass="mb-6"
        />

        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={true}
          placeholder={"Логин"}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          placeholder={"Пароль"}
          icon={"EditIcon"}
        />

        <div className={infoUserPageStyles.infoUserPage__buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handlerCancel}
          >
            Отмена
          </Button>

          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>

      <div>
        {isModalOpened && (
          <Modal onCloseModal={hideModalWindow}>
            <div className={infoUserPageStyles.infoUserPage__container}>
              {success ? (
                <p className="text text_type_main-medium">
                  Ваши данные успешно изменены
                </p>
              ) : (
                <p className="text text_type_main-medium">
                  Произошла ошибка. Попробуйте снова.
                </p>
              )}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default InfoUserPage;

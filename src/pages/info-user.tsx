import styles from "./info-user.module.scss";
import { useRef, useEffect, FormEvent } from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUser, getUser } from "../services/actions/user";
import { useModal } from "../hooks/useModal";
import Modal from "../components/modal/modal";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/customHooks";

function UserInfo() {
  const { name, email, success } = useAppSelector((store) => store.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { values, handleChange, setValues } = useForm();

  const { isModalOpen, openModal, closeModal } = useModal();

  const showModal = () => {
    openModal();
  };

  const hideModal = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(getUser());
    setValues({ name: name, email: email, password: "" });
  }, [name, email]);

  const onIconClick = () => {
    const inputElement = inputRef.current as HTMLInputElement;
    setTimeout(() => inputElement.focus(), 0);
    inputElement.disabled = false;
    inputElement.classList.remove("input__textfield-disabled");
  };

  const onBlur = () => {
    const inputElement = inputRef.current as HTMLInputElement;
    inputElement.disabled = true;
    inputElement.classList.add("input__textfield-disabled");
  };

  const handlerCancel = () => {
    setValues({ name: name, email: email, password: "" });
  };

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(patchUser(values.email, values.name, values.password));
    if (success) {
      showModal();
    }
  };

  return (
    <>
      <form onSubmit={handlerSubmit}>
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
          placeholder="Логин"
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          placeholder={"Пароль"}
          icon={"EditIcon"}
        />
        <div className={styles.buttons}>
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
        {isModalOpen && (
          <Modal onClosePopup={hideModal}>
            <div className={styles.container}>
              {success ? (
                <p className="text text_type_main-medium">
                  Ваши данные успешно изменены
                </p>
              ) : (
                <p className="text text_type_main-medium">
                  Произошла ошибка. Попробуйте снова
                </p>
              )}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

export default UserInfo;

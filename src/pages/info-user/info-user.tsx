/* Общие импорты */
import { useRef, useEffect, FormEvent } from "react";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUser, getUser } from "../../services/actions/user";
import { useModal } from "../../hooks/useModal";
import { useForm } from "../../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../../hooks/customHooks";

/* Стили */
import styles from "./info-user.module.scss";

/* Компоненты */
import Modal from "../../components/modal/modal";

/* Статичные строки */
const staticStrings = [
  "Отмена",
  "Сохранить",
  "Ваши данные успешно изменены",
  "Произошла ошибка. Попробуйте снова",
];

const UserInfo = () => {
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
        <div className={styles.infoUser__buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handlerCancel}
          >
            {staticStrings[0]}
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            {staticStrings[1]}
          </Button>
        </div>
      </form>

      <div>
        {isModalOpen && (
          <Modal onClosePopup={hideModal}>
            <div className={styles.infoUser__container}>
              {success ? (
                <p className="text text_type_main-medium">{staticStrings[2]}</p>
              ) : (
                <p className="text text_type_main-medium">{staticStrings[3]}</p>
              )}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default UserInfo;

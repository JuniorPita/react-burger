/* Общие импорты */
import { useState, ChangeEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  code?: string;
};

export function useForm(
  inputValues: FormValues = {
    name: "",
    email: "",
    password: "",
    code: "",
  }
) {
  const [values, setValues] = useState<FormValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

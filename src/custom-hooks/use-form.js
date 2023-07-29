/* Общие импорты */
import { useState } from "react";
import PropTypes from "prop-types";

export const useForm = (inputValues = {}) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};

useForm.propTypes = {
  inputValues: PropTypes.object.isRequired,
};

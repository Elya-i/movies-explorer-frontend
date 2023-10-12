import { useState, useCallback } from "react";
import validation from "./validation";

 function useFormValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  function handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    const error = validation(name, value);
    setErrors(validation(name, value));
    setValues({ ...values, [name]: value });
    if (Object.keys(error).length === 0) {
      setIsValid(target.closest("form").checkValidity());
    }
  };

  const resetValidation = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  )

  return {
    values, setValues, errors, isValid, handleChange, resetValidation, onFocus, isFocused,
 };
}

export default useFormValidation;
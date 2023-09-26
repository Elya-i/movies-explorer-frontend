import { useState, useCallback } from "react";

 function useFormValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function onChange(event) {
    const { name, value } = event.target;

    setValues({...values,[name]: value});

    setErrors({...errors,[name]: event.target.validationMessage});

    setIsValid(event.target.closest('.popup__form').checkValidity());
  }

  const resetValidation = useCallback(
    (updatedFormValues = {}, updatedFormErrors = {}, updatedFormIsValid = false) => {
      setValues(updatedFormValues);
      setErrors(updatedFormErrors);
      setIsValid(updatedFormIsValid);
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values, errors, isValid, onChange, resetValidation
  };
};

export default useFormValidation;
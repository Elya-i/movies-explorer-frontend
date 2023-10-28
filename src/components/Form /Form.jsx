import React from "react";
import "./Form.css";

function Form({
  name,
  onSubmit,
  isFormValid,
  ...props
}) {

  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
    </form>
  );
}

export default Form;

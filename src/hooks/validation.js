function validation(name, value) {
  let errors = {};
  if (name === "email") {
    if (!value) {
      errors = { [name]: "E-mail обязателен" };
    } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
      errors = { [name]: "Введите e-mail" };
    }
  }
  if (name === "password") {
    if (!value) {
      errors = { [name]: "Пароль обязателен" };
    }
  }
  if (name === "name") {
    if (!value) {
      errors = { [name]: "Имя обязательно" };
    } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
      errors = {
        [name]: "Имя может содержать только латинские буквы, пробел или дефис",
      };
    } else if (value.length < 1) {
      errors = { [name]: "Имя не должно быть короче 2 символов" };
    }
  }

  return errors;
}

export default validation;
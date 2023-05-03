const validateEmail = (email) => {
  // regex pattern for email
  const re = /\S+@\S+\.\S+/g;

  // check if the email is valid
  let result = re.test(email);
  if (result) {
    return true;
  } else {
    return false;
  }
};

const validateName = (name) => {
  const reg = new RegExp('[0-9]');
  // check if the name is valid
  let result = reg.test(name);
  if (!result) {
    return true;
  } else {
    return false;
  }
};

export { validateEmail, validateName };

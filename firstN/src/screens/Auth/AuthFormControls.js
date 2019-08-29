export const authFormControls = {
  email: {
    value: "",
    valid: false,
    pristine: true,
    validationRules: {
      isEmail: true
    }
  },
  password: {
    value: "",
    valid: false,
    pristine: true,
    validationRules: {
      minLength: 6
    }
  },
  confirmPassword: {
    value: "",
    valid: false,
    pristine: true,
    validationRules: {
      equalTo: "password"
    }
  }
};

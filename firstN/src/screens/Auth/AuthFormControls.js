export const authFormControls = {
  email: {
    value: "",
    valid: false,
    validationRules: {
      isEmail: true
    }
  },
  password: {
    value: "",
    valid: false,
    validationRules: {
      minLength: 6
    }
  },
  confirmPassword: {
    value: "",
    valid: false,
    validationRules: {
      equalTo: "password"
    }
  }
};

export const validateFormValue = (value, key, controls) => {
  let isValid = true;
  const { validationRules: rules } = controls[key];

  Object.defineProperties(rules).forEach(([ruleName, ruleValue]) => {
    switch (ruleName) {
      case "isEmail":
        isValid = isValid && checkEmailValidity(value);
        break;

      case "minLength":
        isValid = isValid && checkMinLengthValidity(value, ruleValue);
        break;

      case "equalTo":
        isValid = isValid && checkEmailValidity(value, ruleValue);
        break;

      default:
        isValid = true;
        break;
    }
  });

  return isValid;
};

const checkEmailValidity = value => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );
};

const checkMinLengthValidity = (value, minLength) => {
  return value.length >= minLength;
};

const checkEqualTo = (value, checkValue) => {
  return value === checkValue;
};

/**
 * Validate input value
 *
 * @param {String} value    - input value
 * @param {String} key      - validation rule name
 * @param {Object} controls - form controls object, example:
 * {
 *   email: {
 *     value: "",
 *     valid: false,
 *     validationRules: {
 *       isEmail: true
 *     }
 *   }
 * }
 * @return {Boolean} Returns boolean
 *
 * @example
 *
 *  validateFormValue('email', 'isEmail', { email: { value: '', valid: false, validationRules: { isEmail: true }}})
 */
export const validateFormValue = (value, key, controls) => {
  let isValid = true;
  const { validationRules: rules } = controls[key];

  Object.keys(rules).forEach(ruleName => {
    switch (ruleName) {
      case "isEmail":
        isValid = isValid && checkEmailValidity(value);
        break;

      case "minLength":
        isValid = isValid && checkMinLengthValidity(value, rules[ruleName]);
        break;

      case "equalTo":
        isValid =
          isValid &&
          checkEqualToValidity(value, controls[rules[ruleName]].value);
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

const checkEqualToValidity = (value, checkValue) => {
  return value === checkValue;
};

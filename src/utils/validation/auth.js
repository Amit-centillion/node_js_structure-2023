const yup = require("yup");
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const auth = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email address"),
});

const register = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(phoneRegExp, "Mobile Number is invalid")
    .test("Only 10 number", (value) => value.length === 10)
    .required("number is required")
    .required("Mobile Number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password minimum 6 character is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email address"),
  lastName: yup.string().required("Lastname is Required"),
  firstName: yup.string().required("Firstname is Required"),
});

const forgot = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter valid email address"),
});

module.exports = {
  auth,
  register,
  forgot,
};

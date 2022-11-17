import * as yup from 'yup';

const COMMON_ERROR_MESSAGE = "Completely fill in the user information"

yup.addMethod(yup.string, 'repeatPassword', function (string) {
    return this.oneOf([string], "Password is wrong");
});

export const RegisterSchema = yup.object().shape({
    repeatPassword: yup.string().min(6,"password en 6 simbol olmalidi").repeatPassword(yup.ref('password')),
    password: yup.string().min(6, "password en 6 simbol olmalidi").required(COMMON_ERROR_MESSAGE),
    email: yup.string().required(COMMON_ERROR_MESSAGE).email("email duz deil"),
    surname: yup.string().required(COMMON_ERROR_MESSAGE),
    name: yup.string().required(COMMON_ERROR_MESSAGE),
});
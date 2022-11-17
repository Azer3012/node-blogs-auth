import * as yup from 'yup'

const COMMON_ERROR_MESSAGE="Email or password must be entered"

export const loginValidationSchema=yup.object().shape({
    password:yup.string().min(6,"en az 6 simvol olmalidi").required(COMMON_ERROR_MESSAGE),
    email:yup.string().required(COMMON_ERROR_MESSAGE).email("email formati duz deil")
})
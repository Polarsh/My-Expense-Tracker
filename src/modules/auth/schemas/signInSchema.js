import * as yup from 'yup'

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio')
    .matches(/^[^\s]+$/, 'El correo electrónico no debe contener espacios'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .matches(/^[^\s]+$/, 'La contraseña no debe contener espacios'),
})

import * as yup from 'yup'

// Esquema de validación con Yup
export const expenseSchema = yup.object().shape({
  name: yup.string().required('El nombre del gasto es obligatorio'),
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .required('El monto es obligatorio')
    .positive('El monto debe ser positivo'),
  currency: yup.string().required('La moneda es obligatoria'),
  category: yup.string().required('La categoría es obligatoria'),
  subcategory: yup.string().required('La subcategoría es obligatoria'),
  company: yup.string().required('La empresa es obligatoria'),
  paymentMethod: yup.string().required('El método de pago es obligatorio'),
  date: yup.date().required('La fecha es obligatoria'),
})

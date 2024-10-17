import * as yup from 'yup'

// Esquema de validación con Yup
export const recurringExpenseSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre del gasto es requerido')
    .max(100, 'El nombre es demasiado largo'),
  amount: yup
    .number()
    .required('El monto es requerido')
    .min(0.01, 'El monto debe ser mayor que cero'),
  day: yup
    .number()
    .required('El día es requerido')
    .min(1, 'El día no es válido')
    .max(31, 'El día no es válido'),
  company: yup.string().required('La empresa es obligatoria'),
  currency: yup.string().required('La moneda es requerida'),
})

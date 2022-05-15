
import * as yup from 'yup'

export const defaultValues = {
  email: '',
  name: '',
  lastName: '',
  role: null,
  company: '',
  nit: '',
  phonePrefixed: '',
  phone: '',
  address: '',
  companyEmail: '',
  rut: '',
  percentage: 15
}

export const schema = yup.object({
  role: yup.object().required('Rol es requerido').nullable(),
  company: yup.string(),
  nit: yup.string(),
  phonePrefixed: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  companyEmail: yup.string(),
  percentage: yup.number().typeError('Porcentaje debe ser un numero').min(1, 'El valor minimo debe ser 1').max(100, 'El valor maximo debe ser 100').nullable().required('Porcentaje es requerido')
}).required()


import * as yup from 'yup'

export const defaultValues = {
  email: '',
  name: '',
  lastName: '',
  password: '',
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
  email: yup.string().required('Correo electronico es requerido').email('Ingrese un correo electronico valido'),
  name: yup.string().required('Nombres es requerido'),
  lastName: yup.string().required('Apellidos es requerido'),
  password: yup.string().required('Contraseña es requerido'),
  role: yup.object().required('Rol es requerido').nullable(),
  company: yup.string(),
  nit: yup.string(),
  phonePrefixed: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  companyEmail: yup.string(),
  rut: yup.object().nullable(),
  percentage: yup.number().typeError('Porcentaje debe ser un numero').min(1, 'El valor minimo debe ser 1').max(100, 'El valor maximo debe ser 100').nullable().required('Porcentaje es requerido')
}).required()

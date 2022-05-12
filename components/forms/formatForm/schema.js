
import * as yup from 'yup'

export const defaultValues = {
  width: 0,
  height: 0,
  type: null,
  name: ''
}

export const schema = yup.object({
  width: yup.number().typeError('Ancho debe ser un numero').required(),
  height: yup.number().typeError('Alto debe ser un numero').required('Formato es requerido'),
  type: yup.object().required().nullable(),
  name: yup.string().required('Nombre es requerido')
}).required()

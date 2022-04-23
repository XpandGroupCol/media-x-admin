
import * as yup from 'yup'

export const defaultValues = {
  publisher: '',
  locations: [],
  ageRange: [],
  sex: null,
  pricePerUnit: '',
  miniBudget: '',
  objective: null,
  device: null,
  formats: []
}

export const schema = yup.object({
  publisher: yup.string().required('Publisher es requerido.'),
  locations: yup.array().min(1, 'Ubicaciones es requerido').required('Ubicaciones es requerido'),
  ageRange: yup.array().min(1).required(),
  sex: yup.object().required().nullable(),
  pricePerUnit: yup.string().required(),
  miniBudget: yup.string().required(),
  objective: yup.object().required().nullable(),
  device: yup.object().required().nullable(),
  formats: yup.array().min(1).required()
}).required()

export const setList = (list) => list.map(({ id }) => id)

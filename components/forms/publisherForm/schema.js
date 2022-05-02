
import * as yup from 'yup'

export const defaultValues = {
  publisher: '',
  locations: [],
  ageRange: [],
  sex: null,
  miniBudget: '',
  formats: [{
    format: null,
    objective: null,
    biddingModel: null,
    device: null,
    pricePerUnit: ''
  }]
}

export const schema = yup.object({
  publisher: yup.string().required('Publisher es requerido.'),
  locations: yup.array().min(1, 'Ubicaciones es requerido.').required('Ubicaciones es requerido.'),
  ageRange: yup.array().min(1, 'Rango de edades es requerido.').required('Rango de edades es requerido.'),
  sex: yup.object().required('Sexo es requerido.').nullable(),
  miniBudget: yup.string().required('Inversion minima es requerido.'),
  formats: yup.array().of(
    yup.object({
      format: yup.object().required('Formato es requerido.').nullable(),
      objective: yup.object().required('Objetivo es requerido.').nullable(),
      biddingModel: yup.object().required('Modelo es requerido.').nullable(),
      device: yup.object().required('Dispositivo es requerido.').nullable(),
      pricePerUnit: yup.string().required('Precio por unidad es requerido.')
    })
  )
}).required()

export const setList = (list) => list.map(({ id }) => id)

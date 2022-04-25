import { useNotification } from 'providers/notificationProvider'
import { useCallback, useState } from 'react'
import axios from 'axios'
const useMutateHandler = () => {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const mutateHandler = useCallback(async ({
    path, body = {}, method, onSuccess, headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }) => {
    try {
      setLoading(true)
      const { data } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
        method,
        headers,
        data: body
      })

      notify({ type: 'success', message: 'Registro creado/actualizado con exito.' })
      setLoading(false)
      onSuccess && onSuccess(data)
      return data
    } catch (error) {
      notify({ type: 'error', message: 'Algo salio mal, por favor intente nuevamente.' })
      setLoading(false)
    }
  }, [])

  const mutateWithImage = useCallback(async ({
    path, body = {}, method, onSuccess
  }) => {
    try {
      setLoading(true)
      const { data } = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
        method,
        data: body
      })

      notify({ type: 'success', message: 'Registro creado/actualizado con exito.' })
      setLoading(false)
      onSuccess && onSuccess(data)
      return data
    } catch (error) {
      notify({ type: 'error', message: 'Algo salio mal, por favor intente nuevamente.' })
      setLoading(false)
    }
  }, [])

  return {
    mutateHandler,
    mutateWithImage,
    loading
  }
}

export default useMutateHandler

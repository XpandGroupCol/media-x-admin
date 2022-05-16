import { useNotification } from 'providers/notificationProvider'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { getAuth } from 'utils/cookie'
import { BASE_URL } from 'utils/constants'
const useMutateHandler = () => {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()
  const mutateHandler = useCallback(async ({
    path, body = {}, method, headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }) => {
    try {
      setLoading(true)
      const { data } = await axios(`${BASE_URL}${path}`, {
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${getAuth()}`
        },
        data: body
      })

      notify({ type: 'success', message: 'Registro creado/actualizado con exito.' })
      setLoading(false)

      return Promise.resolve(data)
    } catch (error) {
      notify({ type: 'error', message: 'Algo salio mal, por favor intente nuevamente.' })
      setLoading(false)
    }
  }, [])

  const mutateWithImage = useCallback(async ({
    path, body = {}, method
  }) => {
    try {
      setLoading(true)
      const { data } = await axios(`${BASE_URL}${path}`, {
        method,
        data: body,
        headers: {
          Authorization: `Bearer ${getAuth()}`
        }
      })

      notify({ type: 'success', message: 'Registro creado/actualizado con exito.' })
      setLoading(false)
      return Promise.resolve(data)
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

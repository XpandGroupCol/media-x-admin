import { useCallback, useState } from 'react'
import { useNotification } from 'providers/notificationProvider'
import { changePassword } from 'services/profileServices'
import { authChangePassword } from 'services/auth'

const useChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const { notify } = useNotification()

  const updatePassword = useCallback(async (payload, isAuth = false) => {
    try {
      setLoading(true)
      const fn = isAuth ? authChangePassword : changePassword
      await fn(payload)
      setLoading(false)
      notify({ message: 'Su contraseña ha sido actualizada correctamente', type: 'success' })
      return Promise.resolve(true)
    } catch (error) {
      setLoading(false)
      notify({ message: 'Error mensaje', type: 'error' })
    }
  }, [])

  return {
    updatePassword,
    loading
  }
}

export default useChangePassword

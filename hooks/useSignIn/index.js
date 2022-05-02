
import { useRouter } from 'next/router'
import { useNotification } from 'providers/notificationProvider'
import { useSession } from 'providers/sessionProvider'
import { useCallback, useState } from 'react'
import { signInWithCredentials } from 'services/auth'

const useSignIn = () => {
  const { notify } = useNotification()
  const { setSession } = useSession()

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const loginCrendentials = useCallback(async ({ email, password }) => {
    try {
      setLoading(true)
      const { data: user } = await signInWithCredentials({ email, password })
      setSession(user)
      router.replace('/')
    } catch (error) {
      setLoading(false)
      notify({ message: error?.response?.data?.message, type: 'error' })
    }
  }, [])

  const logout = useCallback(() => {}, [])

  return {
    loginCrendentials,
    logout,
    loading

  }
}

export default useSignIn

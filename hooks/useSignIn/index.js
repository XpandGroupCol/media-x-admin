import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useNotification } from 'providers/notificationProvider'
import { useCallback, useState } from 'react'

const useSignIn = () => {
  const { notify } = useNotification()

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const loginCrendentials = useCallback(async ({ email, password }) => {
    try {
      setLoading(true)
      const { error, url } = await signIn('credentials', { redirect: false, callbackUrl: '/', email, password })
      setLoading(false)
      if (error) return notify({ message: error, type: 'error' })
      router.push(url)
    } catch (error) {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => signOut({ callbackUrl: '/auth/login' }), [])

  return {
    loginCrendentials,
    logout,
    loading

  }
}

export default useSignIn

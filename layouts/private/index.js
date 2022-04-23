import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import LoadingPage from 'components/loadingPage'
import AdminLayout from 'layouts/adminLayout'
const Private = ({ children }) => {
  const { data: session } = useSession({ required: true })
  const isUser = !!session?.user
  const router = useRouter()

  useEffect(() => {
    if (session === null) return router.push('/auth/login?error=SessionExpired')
  }, [session])

  if (isUser) {
    return (
      <AdminLayout>
        {children}
      </AdminLayout>
    )
  }

  return <LoadingPage />
}

export default Private

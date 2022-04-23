import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import LoadingPage from 'components/loadingPage'
const Public = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) return router.push('/')
  }, [session])

  if (session !== null) {
    return <LoadingPage />
  }

  return children
}

export default Public

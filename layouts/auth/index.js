
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'providers/sessionProvider'
import LoadingPage from 'components/loadingPage'
import styles from '../layout.module.css'

export default function Auth ({ children }) {
  const { session } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (session) router.replace('/')
  }, [session, router])

  if (session === undefined) return <LoadingPage />

  return (
    <div className={styles.auth}>
      {children}
    </div>
  )
}

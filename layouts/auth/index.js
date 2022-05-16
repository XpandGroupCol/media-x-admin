import { useRouter } from 'next/router'
import { useSession } from 'providers/sessionProvider'
import styles from '../layout.module.css'

export default function Auth ({ children }) {
  const { session } = useSession()

  const router = useRouter()

  if (session) {
    router.replace('/')
    return null
  }
  return (
    <div className={styles.auth}>
      {children}
    </div>
  )
}

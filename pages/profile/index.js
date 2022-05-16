import styles from './profile.module.css'

import useSWR from 'swr'
import { BASE_URL } from 'utils/constants'
import Typography from 'components/typography'
import { Avatar } from '@mui/material'
import Button from 'components/button'
import { useState } from 'react'
import ChangePassword from 'components/forms/changePassword'

const Profile = () => {
  const { data = {}, error } = useSWR(`${BASE_URL}/users/profile`)
  const { data: user } = data

  const [showModal, setShowModal] = useState(false)

  const handleSetShowModal = () => {
    setShowModal(true)
  }

  const handleSetCloseModal = () => {
    setShowModal(false)
  }

  if (!user && !error) return <p>loading...</p>

  return (
    <section className={styles.profile}>
      <Avatar src={user?.avatar} sx={{ width: '100px', height: '100px' }} />
      <Typography className={styles.name}>{user?.fullName}</Typography>
      <Typography className={styles.email}>{user?.email}</Typography>
      <Typography className={styles.role}>{user?.role?.label}</Typography>
      <Button size='small' onClick={handleSetShowModal}>Cambiar contraseña</Button>
      <ChangePassword open={showModal} onClose={handleSetCloseModal} onSubmit={handleSetCloseModal} />
    </section>
  )
}

export default Profile

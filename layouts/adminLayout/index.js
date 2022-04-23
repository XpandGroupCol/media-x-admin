import { useState } from 'react'
import { useSession } from 'next-auth/react'
import classNames from 'classnames'

import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import CampaignIcon from '@mui/icons-material/Campaign'
import LogoutIcon from '@mui/icons-material/Logout'
import PlaceIcon from '@mui/icons-material/Place'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import InsightsIcon from '@mui/icons-material/Insights'
import Filter1Icon from '@mui/icons-material/Filter1'
import DashboardIcon from '@mui/icons-material/Dashboard'

import Typography from 'components/typography'
import ActiveLink from 'components/activeLink'
import useSignIn from 'hooks/useSignIn'

import styles from '../layout.module.css'

const AdminLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () =>
    setAnchorEl(null)

  const { data } = useSession()
  const { logout } = useSignIn()

  const handleShowMenu = () =>
    setShowMenu(prevValue => !prevValue)

  return (
    <div className={styles.page}>
      {showMenu && <div className={styles.overlay} onClick={handleShowMenu} />}
      <aside className={classNames(styles.aside, { [styles.showAside]: showMenu })}>
        <Typography className={styles.logo}>MEDIAX</Typography>
        <div className={styles.nav}>
          <ActiveLink href='/' activeClassName={styles.active}>
            <a className={styles.link}>
              <DashboardIcon />
              Dashboard
            </a>
          </ActiveLink>
          <ActiveLink href='/users' activeClassName={styles.active}>
            <a className={styles.link}>
              <PersonIcon />
              Usuarios
            </a>
          </ActiveLink>
          <ActiveLink href='/campaigns' activeClassName={styles.active}>
            <a className={styles.link}>
              <CampaignIcon />
              Campañas
            </a>
          </ActiveLink>
          <ActiveLink href='/ages' activeClassName={styles.active}>
            <a className={styles.link}>
              <Filter1Icon />
              Edades
            </a>
          </ActiveLink>
          <ActiveLink href='/publishers' activeClassName={styles.active}>
            <a className={styles.link}>
              <ArtTrackIcon />
              Publishers
            </a>
          </ActiveLink>
          <ActiveLink href='/objetives' activeClassName={styles.active}>
            <a className={styles.link}>
              <GpsFixedIcon />
              Objetivos
            </a>
          </ActiveLink>
          <ActiveLink href='/places' activeClassName={styles.active}>
            <a className={styles.link}>
              <PlaceIcon />
              Ubicaciones
            </a>
          </ActiveLink>
          <ActiveLink href='/sectors' activeClassName={styles.active}>
            <a className={styles.link}>
              <InsightsIcon />
              Sectores
            </a>
          </ActiveLink>
          <ActiveLink href='/formats' activeClassName={styles.active}>
            <a className={styles.link}>
              <InsightsIcon />
              Formatos
            </a>
          </ActiveLink>
        </div>

      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logoSection}>
            <IconButton className={styles.openMenu} color='primary' onClick={handleShowMenu}>
              <MenuIcon />
            </IconButton>
            <Typography component='h2' color='primary'>MEDIAX</Typography>
          </div>

          <button onClick={handleClick} className={styles.logout}>
            <div>
              <Typography>{data?.user?.name}</Typography>
              <Typography sx={{ fontSize: 12, textAlign: 'right' }}>{data?.user?.role}</Typography>
            </div>
            <Avatar sx={{ width: 36, height: 36 }}>M</Avatar>
          </button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={() => {
              handleClose()
              logout()
            }}
            >
              <LogoutIcon fontSize='20' />
              Cerrar sesion
            </MenuItem>
          </Menu>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout

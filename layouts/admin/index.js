import { useState } from 'react'
import classNames from 'classnames'

import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material'
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
import { useSession } from 'providers/sessionProvider'

import styles from '../layout.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

const AdminLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () =>
    setAnchorEl(null)

  const handleShowMenu = () =>
    setShowMenu(prevValue => !prevValue)

  const handleCloseMenu = () => setShowMenu(false)

  const { session, logout } = useSession()

  const { replace } = useRouter()

  if (session === null) {
    replace('/auth/login')
    return null
  }

  return (
    <div className={styles.page}>
      {showMenu && <div className={styles.overlay} onClick={handleShowMenu} />}
      <aside className={classNames(styles.aside, { [styles.showAside]: showMenu })}>
        <Typography className={styles.logo}>MEDIAX</Typography>
        <div className={styles.nav}>
          <ActiveLink href='/' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
              <DashboardIcon />
              Dashboard
            </a>
          </ActiveLink>
          <ActiveLink href='/users' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
              <PersonIcon />
              Usuarios
            </a>
          </ActiveLink>
          <ActiveLink href='/campaigns' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
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
            <a className={styles.link} onClick={handleCloseMenu}>
              <ArtTrackIcon />
              Publishers
            </a>
          </ActiveLink>
          <ActiveLink href='/objectives' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
              <GpsFixedIcon />
              Objetivos
            </a>
          </ActiveLink>
          <ActiveLink href='/places' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
              <PlaceIcon />
              Ubicaciones
            </a>
          </ActiveLink>
          <ActiveLink href='/sectors' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
              <InsightsIcon />
              Sectores
            </a>
          </ActiveLink>
          <ActiveLink href='/formats' activeClassName={styles.active}>
            <a className={styles.link} onClick={handleCloseMenu}>
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
              <Typography sx={{
                maxWidth: 180,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              >{session?.name}
              </Typography>
              <Typography sx={{ fontSize: 12, textAlign: 'right' }}>{session?.role}</Typography>
            </div>
            {session?.image ? <Avatar src={session?.image} sx={{ width: 36, height: 36 }} /> : <Avatar sx={{ width: 36, height: 36 }}>{session?.name?.slice(0, 2)?.toUpperCase()}</Avatar>}
          </button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            className={styles.menu}
          >

            <Link href='/profile'>
              <a onClick={handleClose}>
                <MenuItem>
                  <PersonIcon fontSize='small' sx={{ marginRight: '10px' }} />
                  Perfil
                </MenuItem>
              </a>
            </Link>
            <Divider />
            <MenuItem onClick={logout}>
              <LogoutIcon fontSize='small' sx={{ marginRight: '10px' }} />
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

import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../rows.module.css'
import { memo } from 'react'
import { areEqual } from 'utils'

export const HEADERS = [
  'Name',
  'Rol',
  'Auth',
  'Compañia',
  'Acciones'
]
const UserRow = ({ row, onUpdate, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <div className={styles.row}>
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
          <div className={styles.info}>
            <Typography sx={{ fontWeight: 'bold' }}>{row.fullName}</Typography>
            <Typography>{row.email}</Typography>
            <Typography>{row.phone}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {row.role?.label}
      </TableCell>
      <TableCell>
        {row.provider}
      </TableCell>
      <TableCell>
        {row.company} {row.nit}
      </TableCell>
      <TableCell>
        <div className={styles.row}>
          <IconButton size='small' onClick={onUpdate}>
            <EditIcon fontSize='16' />
          </IconButton>
          <IconButton size='small' onClick={onDelete} disabled={row?.status?.id === 'inactive'}>
            <DeleteIcon fontSize='16' />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(UserRow, areEqual)

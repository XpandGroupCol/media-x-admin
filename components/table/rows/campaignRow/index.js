import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../rows.module.css'
import { format } from 'date-fns'
import { memo } from 'react'
import { areEqual } from 'utils'

const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''

export const HEADERS = [
  'Campaña',
  'Usuario',
  'Fecha',
  'Objetivos',
  'Sector',
  'Acciones'
]

const PublisherRow = ({ row, onUpdate, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        <div className={styles.row}>
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
          <div className={styles.info}>
            <Typography sx={{ fontWeight: 'bold' }}>{row.brand}</Typography>
            <Typography>{row.name}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.row}>
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
          <div className={styles.info}>
            <Typography sx={{ fontWeight: 'bold' }}>{row.user.name}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {parseDate(row?.startDate)} - {parseDate(row?.endDate)}
      </TableCell>
      <TableCell>
        {row?.objective?.name}
      </TableCell>
      <TableCell>
        {row?.sector?.name}
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

export default memo(PublisherRow, areEqual)

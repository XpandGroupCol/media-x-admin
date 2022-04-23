import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import styles from '../rows.module.css'
import { format } from 'date-fns'
import { memo } from 'react'
import { areEqual } from 'utils'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Link from 'next/link'

const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''

export const HEADERS = [
  'Campaña',
  'Usuario',
  'Fecha',
  'Objetivos',
  'Sector',
  'Acciones'
]

const PublisherRow = ({ row, onUpdate, onShow }) => {
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
      <TableCell width={150}>
        {parseDate(row?.startDate)} <br />
        {parseDate(row?.endDate)}
      </TableCell>
      <TableCell>
        {row?.objective?.label}
      </TableCell>
      <TableCell>
        {row?.sector?.label}
      </TableCell>
      <TableCell width={120}>
        <div className={styles.row}>
          <IconButton size='small' onClick={onUpdate}>
            <EditIcon fontSize='small' />
          </IconButton>
          <Link href={`/campaigns/detail/${row?.id}`}>
            <a>
              <IconButton size='small' onClick={onShow}>
                <VisibilityIcon fontSize='small' />
              </IconButton>
            </a>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(PublisherRow, areEqual)

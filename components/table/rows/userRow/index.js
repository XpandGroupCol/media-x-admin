import { memo } from 'react'
import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import StatusTag from 'components/statusTag'
import styles from '../rows.module.css'
import { areEqual } from 'utils'
import Link from 'next/link'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export const HEADERS = [
  'Name',
  'Compañia',
  'Rol',
  'Estado',
  'Rut',
  'verificado',
  'Acciones'
]
const UserRow = ({ row, onUpdate, onDelete }) => {
  console.log({ row })
  return (
    <TableRow>
      <TableCell width='30%'>
        <div className={styles.row}>
          {row?.avatar
            ? <Avatar sx={{ width: 36, height: 36 }} src={row?.avatar} />
            : (
              <Avatar sx={{ width: 36, height: 36, textTransform: 'uppercase' }}>
                {row?.fullName.slice(0, 2)}
              </Avatar>)}
          <div className={styles.info}>
            <Typography sx={{ fontWeight: 'bold' }}>{row.fullName}</Typography>
            <Typography component='span'>{row.email}</Typography>
            <Typography component='span'>{row.phone}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell width='20%'>
        {row.company} {row.nit}
      </TableCell>
      <TableCell width='10%'>
        {row.role?.label}
      </TableCell>
      <TableCell width='10%'>
        {row?.checkRut ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: '#54d62c' }} /> : <HighlightOffIcon color='error' fontSize='small' />}
      </TableCell>
      <TableCell width='10%'>
        <StatusTag status={row.status} />
      </TableCell>
      <TableCell width='10%' align='center'>
        {row.emailVerified ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: '#54d62c' }} /> : <QueryBuilderIcon color='warning' fontSize='small' />}
      </TableCell>

      <TableCell width='10%' align='center'>
        <div className={styles.row}>
          <Link href={`users/edit/${row?.id}`}>
            <IconButton size='small' onClick={onUpdate} component='a'>
              <EditIcon fontSize='small' />
            </IconButton>
          </Link>

        </div>

      </TableCell>
    </TableRow>
  )
}

export default memo(UserRow, areEqual)

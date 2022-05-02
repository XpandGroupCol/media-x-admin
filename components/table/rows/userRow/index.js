import { memo } from 'react'
import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import StatusTag from 'components/statusTag'
import styles from '../rows.module.css'
import { areEqual } from 'utils'

export const HEADERS = [
  'Name',
  'Compañia',
  'Rol',
  'Auth',
  'Estado',
  'verificado',
  'Acciones'
]
const UserRow = ({ row, onUpdate, onDelete }) => {
  return (
    <TableRow>
      <TableCell width='30%'>
        <div className={styles.row}>
          {row?.image
            ? <Avatar sx={{ width: 36, height: 36 }} src={row?.image} />
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
        {row.provider}
      </TableCell>
      <TableCell width='10%'>
        <StatusTag status={row.status?.id === 0} />
      </TableCell>
      <TableCell width='10%' align='center'>
        {row.emailVerified ? <CheckCircleOutlineIcon fontSize='small' sx={{ color: '#54d62c' }} /> : <QueryBuilderIcon color='warning' fontSize='small' />}
      </TableCell>

      <TableCell width='10%' align='center'>

        <IconButton size='small' onClick={onUpdate}>
          <EditIcon fontSize='small' />
        </IconButton>
        {/* <IconButton size='small' onClick={onDelete} disabled={row?.status?.id === 'inactive'}>
            <DeleteIcon fontSize='small' />
          </IconButton> */}

      </TableCell>
    </TableRow>
  )
}

export default memo(UserRow, areEqual)

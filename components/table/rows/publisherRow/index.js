import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from '../rows.module.css'
import { memo } from 'react'
import { areEqual } from 'utils'

export const HEADERS = [
  'Publisher',
  'Objetivo',
  'Ubicaciones',
  'Formatos',
  'Rango de edad',
  'Dispositivos',
  'Sexo',
  'Acciones'
]
const PublisherRow = ({ row, onUpdate, onDelete }) => {
  console.log({ row })

  return (
    <TableRow>
      <TableCell>
        <div className={styles.row}>
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
          <div className={styles.info}>
            <Typography sx={{ fontWeight: 'bold' }}>{row.publisher}</Typography>
            <Typography>{row.miniBudget}</Typography>
            <Typography>{row.pricePerUnit}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {row?.objective?.label}
      </TableCell>
      <TableCell>
        {row?.locations?.map(({ label }) => label).join(' / ')}
      </TableCell>
      <TableCell>
        {row?.formats?.map(({ label }) => label).join(' / ')}
      </TableCell>
      <TableCell>
        {row?.ageRange?.map(({ label }) => label).join(' / ')}
      </TableCell>
      <TableCell>
        {row?.device?.label}
      </TableCell>
      <TableCell>
        {row?.sex?.label}
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

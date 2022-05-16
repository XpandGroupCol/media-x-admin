import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import styles from '../rows.module.css'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import { memo } from 'react'
import { areEqual, getCountry, getFullCountry } from 'utils'
import StatusTag from 'components/statusTag'

export const HEADERS = [
  'Nombre',
  'Pais',
  'Estado',
  'Acciones'
]
const LocationRow = ({ row, onUpdate, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        {getFullCountry(row)}
      </TableCell>
      <TableCell width={150}>
        {getCountry(row?.country)}
      </TableCell>
      <TableCell width={150}>
        <StatusTag status={row.status} />
      </TableCell>
      <TableCell width={120}>
        <div className={styles.row}>
          <IconButton size='small' onClick={onUpdate}>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={onDelete} sx={{ color: !row.status ? '#ff4842' : '#54d62c' }}>
            {!row.status ? <ToggleOnIcon fontSize='small' /> : <ToggleOffIcon fontSize='small' />}
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(LocationRow, areEqual)

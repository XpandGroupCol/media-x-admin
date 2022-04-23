import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import styles from '../rows.module.css'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import { memo } from 'react'
import { areEqual } from 'utils'

export const HEADERS = [
  'Nombre',
  'Estado',
  'Acciones'
]
const ListRow = ({ row, onUpdate, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        {row.name}
      </TableCell>
      <TableCell width={150}>
        {row.status ? 'Activo' : 'Inactivo'}
      </TableCell>
      <TableCell width={120}>
        <div className={styles.row}>
          <IconButton size='small' onClick={onUpdate}>
            <EditIcon fontSize='16' />
          </IconButton>
          <IconButton size='small' onClick={onDelete} color={row.status ? 'error' : 'success'}>
            {row.status ? <ToggleOffIcon fontSize='16' /> : <ToggleOnIcon fontSize='16' />}
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(ListRow, areEqual)

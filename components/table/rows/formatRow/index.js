import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import styles from '../rows.module.css'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import { memo } from 'react'
import { areEqual } from 'utils'
import StatusTag from 'components/statusTag'

export const HEADERS = [
  'Nombre',
  'Format',
  'Tamaño en PX',
  'Estado',
  'Acciones'
]
const FormatRow = ({ row, onUpdate, onDelete }) => {
  return (
    <TableRow>
      <TableCell>
        {row.name}
      </TableCell>
      <TableCell>
        {row.type?.label}
      </TableCell>
      {row.type?.isVideo
        ? (
          <TableCell>
            --
          </TableCell>)
        : (
          <TableCell>
            {row.width}px - {row.height}px
          </TableCell>)}
      <TableCell>
        <StatusTag status={row.status} />
      </TableCell>
      <TableCell>
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

export default memo(FormatRow, areEqual)

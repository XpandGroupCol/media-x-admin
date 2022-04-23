import { Avatar, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import styles from '../rows.module.css'
import { memo } from 'react'
import { areEqual, getFormatedLists, getFormatedNumber } from 'utils'
import Link from 'next/link'
import Tooltip from 'components/tooltip'

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
  return (
    <TableRow>
      <TableCell width='22%'>
        <div className={styles.row}>
          <Avatar sx={{ width: 36, height: 36 }}>H</Avatar>
          <div className={styles.info}>
            <Typography sx={{ fontWeight: 'bold' }}>{row.publisher}</Typography>
            <Typography component='span'>$ {getFormatedNumber(row.miniBudget)}</Typography>
            <Typography component='span'>$ {getFormatedNumber(row.pricePerUnit)} c/u</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell width='12%'>
        {row?.objective?.label}
      </TableCell>
      <TableCell width='12%'>
        <Tooltip text={getFormatedLists(row?.locations)} />
      </TableCell>
      <TableCell width='12%'>
        <Tooltip text={getFormatedLists(row?.formats)} />
      </TableCell>
      <TableCell width='12%'>
        <Tooltip text={getFormatedLists(row?.ageRange)} />
      </TableCell>
      <TableCell width='10%'>
        {row?.device?.label}
      </TableCell>
      <TableCell width='10%'>
        {row?.sex?.label}
      </TableCell>
      <TableCell width='10%'>
        <div className={styles.row}>
          <Link href={`publishers/edit/${row?.id}`}>
            <a>
              <IconButton size='small' onClick={onUpdate}>
                <EditIcon fontSize='small' />
              </IconButton>
            </a>
          </Link>
          <IconButton size='small' onClick={onDelete} sx={{ color: !row.status ? '#ff4842' : '#54d62c' }}>
            {!row.status ? <ToggleOnIcon fontSize='small' /> : <ToggleOffIcon fontSize='small' />}
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default memo(PublisherRow, areEqual)

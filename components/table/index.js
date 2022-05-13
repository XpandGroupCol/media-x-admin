import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, CircularProgress } from '@mui/material'
import Pagination from 'components/pagination'
import { useRouter } from 'next/router'
import { memo } from 'react'
import styles from './table.module.css'
import Button from 'components/button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Typography from 'components/typography'
// TODO:Organizar el loading y el error

const CustomTable = ({ headers, children, count, loading, error }) => {
  const router = useRouter()

  if (error) {
    return (
      <div className={styles.erorPage}>
        <ErrorOutlineIcon sx={{ fontSize: 60, color: '#d32f2f', marginBottom: '20px' }} />
        <Typography sx={{ fontSize: '17px', fontWeight: 'bold', lineHeight: 1 }}>Algo salio mal</Typography>
        <Typography sx={{ fontSize: '14px', marginBottom: '20px' }}>Por favor reintene nuevamente</Typography>
        <Button variant='outlined' color='secondary' size='small' onClick={() => router.reload()}>
          Reintentar
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <Pagination count={count} />
      </div>
    </>
  )
}

export default memo(CustomTable)

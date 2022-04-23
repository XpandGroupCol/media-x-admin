import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, CircularProgress } from '@mui/material'
import Pagination from 'components/pagination'
import { memo } from 'react'
import styles from './table.module.css'

// TODO:Organizar el loading y el error

const CustomTable = ({ headers, children, count, loading, error }) => {
  if (error) {
    return (
      <div>
        <p>Error</p>
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

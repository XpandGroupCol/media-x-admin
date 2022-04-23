import MuiPagination from '@mui/material/Pagination'
import useQueryParams from 'hooks/useQueryParams'

const Pagination = ({ count }) => {
  const { page = 1, setQueryParams } = useQueryParams()

  const onChange = (_, page) => setQueryParams({ page })

  return (
    <MuiPagination count={count} page={parseInt(page || 1)} onChange={onChange} variant='outlined' color='secondary' />
  )
}
export default Pagination

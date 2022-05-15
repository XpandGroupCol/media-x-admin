import { useCallback, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

import ConfirmationModal from 'components/confirmationModal'
import Button from 'components/button'
import CustomTable from 'components/table'
import Typography from 'components/typography'
import UserRow, { HEADERS } from 'components/table/rows/userRow'
import UserFilters from 'components/filters/user'

import useMutateHandler from 'hooks/useMutateHandler'
import useGetData from 'hooks/useGetData'
import Link from 'next/link'

const Users = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/users')

  const { data: users = [], pages = 0 } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onSuccess = () => {
    mutate(data, { revalidate: true })
    handleSetRow()()
  }

  const onDelete = () => {
    const path = `/users/${modalShow?.row?.id}`
    mutateHandler({ onSuccess, method: 'DELETE', path })
  }

  return (
    <>
      <section className='header'>
        <Typography component='h1' color='secondary'>Usuarios</Typography>
        <Link href='/users/create'>
          <Button size='small' component='a'>
            <AddIcon />  Usuario
          </Button>
        </Link>
      </section>
      <section className='section'>
        <UserFilters />
      </section>

      <CustomTable
        count={pages}
        headers={HEADERS}
        loading={loading}
        error={error}
      >
        {users.map(row => (
          <UserRow
            key={row?.email}
            row={row}
            onUpdate={handleSetRow('edit', row)}
            onDelete={handleSetRow('delete', row)}
          />
        ))}
      </CustomTable>
      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDelete}
        title='Eliminar usuario'
        loading={load}
        onClose={handleSetRow()}
      >
        <Typography align='center'>Estas seguro de eliminar el usuario
          <Typography component='strong' sx={{ fontWeight: 'bold' }}>
            {' '}{modalShow?.row?.name || ''}
          </Typography> ?
        </Typography>
      </ConfirmationModal>
    </>
  )
}

export default Users

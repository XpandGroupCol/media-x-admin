import { useCallback, useState } from 'react'

import ConfirmationModal from 'components/confirmationModal'
import Button from 'components/button'
import AddIcon from '@mui/icons-material/Add'
import useMutateHandler from 'hooks/useMutateHandler'
import useGetData from 'hooks/useGetData'

import CustomTable from 'components/table'
import Typography from 'components/typography'

import SectorFilters from 'components/filters/lists'
import ListRow, { HEADERS } from 'components/table/rows/listRow'
import ListForm from 'components/forms/listForm'

const Places = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/locations')
  const { data: locations = [], pages = 0 } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onSuccess = () => {
    mutate(data, { revalidate: true })
    handleSetRow()()
  }

  const onDelete = () => {
    const path = `/locations/${modalShow?.row?._id}`

    const body = { status: !modalShow?.row?.status }
    mutateHandler({ onSuccess, method: 'DELETE', path, body })
  }

  const onSubmit = ({ _id, name }) => {
    const body = { name }
    const path = _id ? `/locations/${_id}` : '/locations'
    const method = _id ? 'PUT' : 'POST'
    mutateHandler({ path, method, body, onSuccess })
  }

  return (
    <>
      <section className='header'>
        <Typography component='h1' color='secondary'>Ubicaciones</Typography>
        <Button size='small' onClick={handleSetRow('form')}>
          <AddIcon />  Ubicacion
        </Button>
      </section>
      <section className='section'>
        <SectorFilters />
      </section>

      <CustomTable
        count={pages}
        headers={HEADERS}
        loading={loading}
        error={error}
      >
        {locations.map(row => (
          <ListRow
            key={row?._id}
            row={row}
            onUpdate={handleSetRow('form', row)}
            onDelete={handleSetRow('delete', row)}
          />
        ))}
      </CustomTable>

      <ListForm
        open={Boolean(modalShow?.type === 'form')}
        onClose={handleSetRow()}
        onSuccess={onSuccess}
        onSubmit={onSubmit}
        Sload={load}
        list={modalShow?.row}
        title='Ubicacion'
        placeholder='ubicacion'
      />

      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDelete}
        title='Desactivar Sector'
        loading={load}
        onClose={handleSetRow()}
      >
        <Typography align='center'>Estas seguro de {`${modalShow?.row?.status ? 'desactivar' : 'activar'}`} la siguiente ubicacion:
          <Typography component='strong' sx={{ fontWeight: 'bold' }}>
            {' '}{modalShow?.row?.name || ''}?
          </Typography>
        </Typography>
      </ConfirmationModal>
    </>
  )
}

export default Places

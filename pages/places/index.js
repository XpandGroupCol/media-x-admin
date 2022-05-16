import { useCallback, useState } from 'react'

import ConfirmationModal from 'components/confirmationModal'
import Button from 'components/button'
import AddIcon from '@mui/icons-material/Add'
import useMutateHandler from 'hooks/useMutateHandler'
import useGetData from 'hooks/useGetData'

import CustomTable from 'components/table'
import Typography from 'components/typography'

import SectorFilters from 'components/filters/lists'
import LocationRow, { HEADERS } from 'components/table/rows/locationRow'
import LocationForm from 'components/forms/locationForm'
import { useLists } from 'providers/listProvider'

const Places = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/locations')
  const { data: locations = [], pages = 0 } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const { refreshLists } = useLists()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onDelete = () => {
    const path = `/locations/${modalShow?.row?._id}`

    const body = { status: !modalShow?.row?.status }
    mutateHandler({ method: 'DELETE', path, body }).then(values => {
      if (values) {
        mutate(data, { revalidate: true })
        handleSetRow()()
        refreshLists()
      }
    })
  }

  const onSubmit = ({ _id, name, country }) => {
    const body = { name: name, country: country?.id }
    const path = _id ? `/locations/${_id}` : '/locations'
    const method = _id ? 'PUT' : 'POST'
    mutateHandler({ path, method, body })
      .then(values => {
        if (values) {
          mutate(data, { revalidate: true })
          handleSetRow()()
          refreshLists()
        }
      })
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
          <LocationRow
            key={row?._id}
            row={row}
            onUpdate={handleSetRow('form', row)}
            onDelete={handleSetRow('delete', row)}
          />
        ))}
      </CustomTable>

      <LocationForm
        open={Boolean(modalShow?.type === 'form')}
        onClose={handleSetRow()}
        onSubmit={onSubmit}
        loading={load}
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

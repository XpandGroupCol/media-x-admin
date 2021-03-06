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
import { useLists } from 'providers/listProvider'

const Sectors = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/sectors')
  const { data: sectors = [], pages } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const { refreshLists } = useLists()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onDelete = () => {
    const path = `/sectors/${modalShow?.row?._id}`

    const body = { status: !modalShow?.row?.status }
    mutateHandler({ method: 'DELETE', path, body })
      .then(values => {
        if (values) {
          mutate(data, { revalidate: true })
          handleSetRow()()
          refreshLists()
        }
      })
  }

  const onSubmit = ({ _id, name }) => {
    const body = { name }
    const path = _id ? `/sectors/${_id}` : '/sectors'
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
        <Typography component='h1' color='secondary'>Sectores</Typography>
        <Button size='small' onClick={handleSetRow('form')}>
          <AddIcon />  Sector
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
        {sectors.map(row => (
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
        onSubmit={onSubmit}
        Sload={load}
        list={modalShow?.row}
        title='Sector'
        placeholder='sector'
      />

      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDelete}
        title='Desactivar Sector'
        loading={load}
        onClose={handleSetRow()}
      >
        <Typography align='center'>Estas seguro de {`${modalShow?.row?.status ? 'desactivar' : 'activar'}`} el siguiente sector:
          <Typography component='strong' sx={{ fontWeight: 'bold' }}>
            {' '}{modalShow?.row?.name || ''}?
          </Typography>
        </Typography>
      </ConfirmationModal>
    </>
  )
}

export default Sectors

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

const Objetives = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/objetives')
  const { data: objetives = [], pages = 0 } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const { refreshLists } = useLists()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onSuccess = () => {
    mutate(data, { revalidate: true })
    handleSetRow()()
    refreshLists()
  }

  const onDelete = () => {
    const path = `/objetives/${modalShow?.row?._id}`

    const body = { status: !modalShow?.row?.status }
    mutateHandler({ onSuccess, method: 'DELETE', path, body })
  }

  const onSubmit = ({ _id, name }) => {
    const body = { name }
    const path = _id ? `/objetives/${_id}` : '/objetives'
    const method = _id ? 'PUT' : 'POST'
    mutateHandler({ path, method, body, onSuccess })
  }

  return (
    <>
      <section className='header'>
        <Typography component='h1' color='secondary'>Objetivos</Typography>
        <Button size='small' onClick={handleSetRow('form')}>
          <AddIcon />  Objetivo
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
        {objetives.map(row => (
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
        title='Objetivo'
        placeholder='objetivo'
      />

      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDelete}
        title='Desactivar Sector'
        loading={load}
        onClose={handleSetRow()}
      >
        <Typography align='center'>Estas seguro de {`${modalShow?.row?.status ? 'desactivar' : 'activar'}`} el siguiente objetivo:
          <Typography component='strong' sx={{ fontWeight: 'bold' }}>
            {' '}{modalShow?.row?.name || ''}?
          </Typography>
        </Typography>
      </ConfirmationModal>
    </>
  )
}

export default Objetives

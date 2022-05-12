import { useCallback, useState } from 'react'

import ConfirmationModal from 'components/confirmationModal'
import Button from 'components/button'
import AddIcon from '@mui/icons-material/Add'
import useMutateHandler from 'hooks/useMutateHandler'
import useGetData from 'hooks/useGetData'

import CustomTable from 'components/table'
import Typography from 'components/typography'

import SectorFilters from 'components/filters/lists'
import FormatRow, { HEADERS } from 'components/table/rows/formatRow'
import FormatForm from 'components/forms/formatForm'
import { useLists } from 'providers/listProvider'

const Formats = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/formats')
  const { data: formats = [], pages } = data

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
    const path = `/formats/${modalShow?.row?._id}`

    const body = { status: !modalShow?.row?.status }
    mutateHandler({ onSuccess, method: 'DELETE', path, body })
  }

  const onSubmit = ({ _id: id, type, ...values }) => {
    const body = { ...values, type: type?.id, isVideo: type?.isVideo }
    const path = id ? `/formats/${id}` : '/formats'
    const method = id ? 'PUT' : 'POST'
    mutateHandler({ path, method, body, onSuccess })
  }

  return (
    <>
      <section className='header'>
        <Typography component='h1' color='secondary'> Formato</Typography>
        <Button size='small' onClick={handleSetRow('form')}>
          <AddIcon />  Formatos
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
        {formats.map(row => (
          <FormatRow
            key={row?._id}
            row={row}
            onUpdate={handleSetRow('form', row)}
            onDelete={handleSetRow('delete', row)}
          />
        ))}
      </CustomTable>

      <FormatForm
        open={Boolean(modalShow?.type === 'form')}
        onClose={handleSetRow()}
        onSuccess={onSuccess}
        onSubmit={onSubmit}
        loading={load}
        list={modalShow?.row}
        title='Formato'
        placeholder='Formato'
      />

      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDelete}
        title='Desactivar Formato'
        loading={load}
        onClose={handleSetRow()}
      >
        <Typography align='center'>Estas seguro de {`${modalShow?.row?.status ? 'desactivar' : 'activar'}`} el siguiente formato:
          <Typography component='strong' sx={{ fontWeight: 'bold' }}>
            {' '}{modalShow?.row?.name || ''}?
          </Typography>
        </Typography>
      </ConfirmationModal>
    </>
  )
}

export default Formats

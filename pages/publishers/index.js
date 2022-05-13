import { useCallback, useState } from 'react'

import ConfirmationModal from 'components/confirmationModal'
import Button from 'components/button'
import AddIcon from '@mui/icons-material/Add'
import useMutateHandler from 'hooks/useMutateHandler'
import useGetData from 'hooks/useGetData'

import CustomTable from 'components/table'
import Typography from 'components/typography'
import PublisherFilters from 'components/filters/publishers'
import Link from 'next/link'
import PublisherRow, { HEADERS } from 'components/table/rows/publisherRow'

const Publishers = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/publishers')
  const { data: publishers = [], pages = 0 } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onSuccess = () => {
    mutate(data, { revalidate: true })
    handleSetRow()()
  }

  const onDelete = () => {
    const path = `/publishers/${modalShow?.row?.id}`
    const body = { status: !modalShow?.row?.status }
    mutateHandler({ onSuccess, method: 'DELETE', path, body })
  }

  return (
    <>
      <section className='header'>
        <Typography component='h1' color='secondary'>Publishers</Typography>
        <Link href='/publishers/create'>
          <a>
            <Button size='small'>
              <AddIcon />  Publisher
            </Button>
          </a>
        </Link>

      </section>
      <section className='section'>
        <PublisherFilters />
      </section>
      <CustomTable
        count={pages}
        headers={HEADERS}
        loading={loading}
        error={error}
      >
        {publishers.map(row => (
          <PublisherRow
            key={row?.id}
            row={row}
            onUpdate={handleSetRow('edit', row)}
            onDelete={handleSetRow('delete', row)}
          />
        ))}
      </CustomTable>
      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDelete}
        title='Desactivar Sector'
        loading={load}
        onClose={handleSetRow()}
      >
        <Typography align='center'>Estas seguro de {`${modalShow?.row?.status ? 'desactivar' : 'activar'}`} el siguiente publisher:
          <Typography component='strong' sx={{ fontWeight: 'bold' }}>
            {' '}{modalShow?.row?.publisher || ''}?
          </Typography>
        </Typography>
      </ConfirmationModal>
    </>
  )
}

export default Publishers

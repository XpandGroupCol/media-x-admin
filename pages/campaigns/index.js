import { useCallback, useState } from 'react'

import ConfirmationModal from 'components/confirmationModal'
import CustomTable from 'components/table'
import Typography from 'components/typography'
import useMutateHandler from 'hooks/useMutateHandler'
import CampaignsFilter from 'components/filters/campaigns'
import CampaignRow, { HEADERS } from 'components/table/rows/campaignRow'
import useGetData from 'hooks/useGetData'

const Campaigns = () => {
  const [modalShow, setModalShow] = useState({ type: '', row: null })

  const { data = {}, error, loading, mutate } = useGetData('/campaigns')
  const { data: campaigns = [], pages = 0 } = data

  const { loading: load, mutateHandler } = useMutateHandler()

  const handleSetRow = useCallback((type = '', row = null) => () => {
    setModalShow({ type, row })
  }, [])

  const onSuccess = () => {
    mutate(data, { revalidate: true })
    handleSetRow()()
  }

  const onDeleteUser = () => {
    const path = `/campaigns/${modalShow?.row?.id}`
    mutateHandler({ onSuccess, method: 'DELETE', path })
  }

  return (
    <>
      <section className='header'>
        <Typography component='h1' color='secondary'>Campañas</Typography>
      </section>
      <section className='section'>
        <CampaignsFilter />
      </section>

      <CustomTable
        count={pages}
        headers={HEADERS}
        loading={loading}
        error={error}
      >
        {campaigns.map(row => (
          <CampaignRow
            key={row?._id}
            row={row}
            onUpdate={handleSetRow('edit', row)}
            onDelete={handleSetRow('delete', row)}
          />
        ))}
      </CustomTable>

      <ConfirmationModal
        open={Boolean(modalShow?.type === 'delete')}
        onSubmit={onDeleteUser}
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

export default Campaigns

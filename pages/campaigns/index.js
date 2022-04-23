import CustomTable from 'components/table'
import Typography from 'components/typography'
import CampaignsFilter from 'components/filters/campaigns'
import CampaignRow, { HEADERS } from 'components/table/rows/campaignRow'
import useGetData from 'hooks/useGetData'

const Campaigns = () => {
  const { data = {}, error, loading } = useGetData('/campaigns')
  const { data: campaigns = [], pages = 0 } = data

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
            key={row?.id}
            row={row}
            onUpdate={() => {}}
          />
        ))}
      </CustomTable>
    </>
  )
}

export default Campaigns

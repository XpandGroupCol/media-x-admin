import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useEffect } from 'react'
import { useNotification } from 'providers/notificationProvider'
import styles from './detail.module.css'
import Typography from 'components/typography'
import { BASE_URL } from 'utils/constants'
const DetailCampaign = () => {
  const { query, replace } = useRouter()

  const { notify } = useNotification()

  const { data, error } = useSWR(`${BASE_URL}/campaigns/${query?.id}`)

  useEffect(() => {
    if (error) {
      notify({ message: 'algo salio mal', type: 'error' })
      replace('/campaigns')
    }
  }, [error])

  if (!data && !error) return <p>loading.....</p>

  const { data: campaign = {} } = data

  return (
    <section className={styles.container}>
      <p>{JSON.stringify(campaign, null, 2)}</p>
      <Typography component='h3'>N: {campaign?.id}</Typography>
      <Typography component='h3'>{campaign?.name}  <Typography component='strong'>{campaign?.brand}</Typography></Typography>
      <article />

      <article>
        publushers...
      </article>
      <article>
        media...
      </article>
    </section>

  )
}

export default DetailCampaign

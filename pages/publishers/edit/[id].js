import { useRouter } from 'next/router'
import useSWR from 'swr'
import PublisherForm from 'components/forms/publisherForm'
import { useEffect } from 'react'
import { useNotification } from 'providers/notificationProvider'

const EditPublisher = () => {
  const { query, replace } = useRouter()

  const { notify } = useNotification()

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/publishers/${query?.id}`)

  useEffect(() => {
    if (error) {
      notify({ message: 'algo salio mal', type: 'error' })
      replace('/publishers')
    }
  }, [error])

  if (!data && !error) return <p>loading.....</p>

  const { data: publisher } = data

  return (

    <PublisherForm publisher={publisher} />

  )
}

export default EditPublisher

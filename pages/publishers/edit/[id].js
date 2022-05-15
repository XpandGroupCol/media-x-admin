import { useRouter } from 'next/router'
import useSWR from 'swr'
import PublisherForm from 'components/forms/editPublisherForm'

const EditPublisher = () => {
  const { query } = useRouter()

  const { data, error } = useSWR(query?.id ? `${process.env.NEXT_PUBLIC_BASE_URL}/publishers/${query?.id}` : null)

  if (!data && !error) return <p>loading.....</p>

  if (error) return <p>error ...</p>

  const { data: publisher } = data

  return (

    <PublisherForm publisher={publisher} edit />

  )
}

export default EditPublisher

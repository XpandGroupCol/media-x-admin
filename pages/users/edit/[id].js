import EditUserForm from 'components/forms/editUserForm'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const EditUser = () => {
  const { query } = useRouter()
  const { id = null } = query

  const { data, error } = useSWR(id ? `${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}` : null)

  if (!data?.data && !error) return <p>loading...</p>

  return (
    <EditUserForm user={data?.data} />
  )
}

export default EditUser

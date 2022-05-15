import EditUserForm from 'components/forms/editUserForm'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { BASE_URL } from 'utils/constants'

const EditUser = () => {
  const { query } = useRouter()
  const { id = null } = query

  const { data, error } = useSWR(id ? `${BASE_URL}/users/${id}` : null)

  if (!data?.data && !error) return <p>loading...</p>

  return (
    <EditUserForm user={data?.data} />
  )
}

export default EditUser

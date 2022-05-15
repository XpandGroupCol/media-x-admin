import { useRouter } from 'next/router'
import { useMemo } from 'react'
import useSWR from 'swr'
import { BASE_URL } from 'utils/constants'

const useGetData = (path) => {
  const { query } = useRouter()

  const params = useMemo(() => {
    query.page ??= '1'
    const queryParams = Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&')
    return queryParams ? `?${queryParams}` : ''
  }, [query])

  const { data, error, mutate } = useSWR(`${BASE_URL}${path}${params}`)

  return {
    data,
    error,
    loading: !data && !error,
    mutate
  }
}

export default useGetData

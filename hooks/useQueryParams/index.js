import { useRouter } from 'next/router'
import { useCallback } from 'react'

const useQueryParams = () => {
  const { query = {}, pathname, push } = useRouter()

  const setQueryParams = useCallback(({ page = 1, ...restOfParams }, base = pathname) => {
    let url = ''
    Object.entries({ ...query, ...restOfParams, page }).forEach(([key, value]) => {
      const prefix = !url.length ? '?' : '&'
      if (!value || value === 'default') return ''
      url += `${prefix}${key}=${value}`
    })

    push(`${base}${url}`)
  }, [query])

  return {
    ...query,
    setQueryParams
  }
}

export default useQueryParams

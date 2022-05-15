
import { createContext, useCallback, useContext, useMemo } from 'react'
import useSWR from 'swr'
import { BASE_URL } from 'utils/constants'

const ListContext = createContext()

const ListProvider = ({ children }) => {
  const { data = {}, mutate } = useSWR(`${BASE_URL}/lists`)

  const refreshLists = useCallback(() => mutate(data, { revalidate: true }))

  const lists = useMemo(() => data, [data])

  return (
    <ListContext.Provider value={{ ...lists, refreshLists }}>
      {children}
    </ListContext.Provider>
  )
}

export const useLists = () => useContext(ListContext)

export default ListProvider

import useSWR from 'swr'

const useLists = () => {
  const { data = {} } = useSWR('http://localhost:3002/lists')

  return {
    ...data
  }
}

export default useLists

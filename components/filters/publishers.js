import InputSearch from 'components/input/searchInput'
import Select from 'components/select'
import useLists from 'hooks/useLists'
import useQueryParams from 'hooks/useQueryParams'

const PublisherFilters = () => {
  const { locations = [], objectives = [] } = useLists()

  const { location = 'default', objective = 'default', setQueryParams } = useQueryParams()

  const handleChangeList = ({ target }) => {
    const { name, value } = target
    setQueryParams({ [name]: value })
  }
  return (
    <>
      <InputSearch
        name='search'
        label='Buscar'
        size='small'
        placeholder='Buscar por nombre o correo'
      />
      <Select
        name='objective'
        label='Objetivo'
        size='small'
        onChange={handleChangeList}
        value={objective}
        options={objectives}
      />
      <Select
        name='location'
        label='Ubicacion'
        size='small'
        onChange={handleChangeList}
        value={location}
        options={locations}
      />
    </>
  )
}

export default PublisherFilters

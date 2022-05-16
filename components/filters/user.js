import Select from 'components/select'
import InputSearch from 'components/input/searchInput'
import useQueryParams from 'hooks/useQueryParams'
import { useLists } from 'providers/listProvider'

const userFilters = () => {
  const { role = 'default', setQueryParams } = useQueryParams()

  const { roles = [] } = useLists()

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
        name='role'
        label='Rol'
        size='small'
        onChange={handleChangeList}
        value={role}
        options={roles}
      />
    </>
  )
}

export default userFilters

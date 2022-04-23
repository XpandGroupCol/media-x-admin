import Select from 'components/select'
import InputSearch from 'components/input/searchInput'
import useQueryParams from 'hooks/useQueryParams'

const userFilters = () => {
  const { role = 'default', status = 'default', setQueryParams } = useQueryParams()

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
        label='Buscar'
        size='small'
        onChange={handleChangeList}
        value={role}
        options={[]}
      />
      <Select
        name='status'
        label='Estado'
        size='small'
        onChange={handleChangeList}
        value={status}
        options={[]}
      />
    </>
  )
}

export default userFilters

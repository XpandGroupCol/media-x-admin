import InputSearch from 'components/input/searchInput'

const ListSearch = () => {
  return (
    <>
      <InputSearch
        name='search'
        label='Buscar'
        size='small'
        placeholder='Buscar por nombre de la lista'
      />
    </>
  )
}

export default ListSearch

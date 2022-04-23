import InputSearch from 'components/input/searchInput'

const ListSearch = () => {
  return (
    <>
      <InputSearch
        name='search'
        label='Buscar'
        size='small'
        placeholder='Buscar por nombre o correo'
      />
    </>
  )
}

export default ListSearch

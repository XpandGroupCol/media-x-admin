import InputSearch from 'components/input/searchInput'
import Select from 'components/select'
import useLists from 'hooks/useLists'
import useQueryParams from 'hooks/useQueryParams'

// nombre, marca, objetivo, fechas

const CampaignsFilter = () => {
  const { objectives = [] } = useLists()

  const { objective = 'default', setQueryParams } = useQueryParams()

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
    </>
  )
}

export default CampaignsFilter

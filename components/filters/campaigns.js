import InputSearch from 'components/input/searchInput'
import Select from 'components/select'
import { useLists } from 'providers/listProvider'
import useQueryParams from 'hooks/useQueryParams'

// nombre, marca, objetivo, fechas

const CampaignsFilter = () => {
  const { targets = [], sectors = [] } = useLists()

  const { objective = 'default', sector = 'default', setQueryParams } = useQueryParams()

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
        placeholder='Campaña o marca'
      />
      <Select
        name='objective'
        label='Objetivo'
        size='small'
        onChange={handleChangeList}
        value={objective}
        options={targets}
      />
      <Select
        name='sector'
        label='Sector'
        size='small'
        onChange={handleChangeList}
        value={sector}
        options={sectors}
      />
    </>
  )
}

export default CampaignsFilter

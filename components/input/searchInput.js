import { useState } from 'react'
import Input from '.'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

import styles from './inputSearch.module.css'
import { IconButton, InputAdornment } from '@mui/material'
import useQueryParams from 'hooks/useQueryParams'

const InputSearch = ({ ...props }) => {
  const { search = '', setQueryParams } = useQueryParams()
  const [keyword, setKeyword] = useState(search)

  const handleSetKeyword = ({ target }) =>
    setKeyword(target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!keyword) return
    if (keyword === search) return
    setQueryParams({ search: keyword })
  }

  const onClear = () => {
    setKeyword('')
    if (search) setQueryParams({ search: '' })
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        size='small' value={keyword} onChange={handleSetKeyword} {...props} className='search'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end' sx={{ display: keyword ? 'flex' : 'none' }}>
              <IconButton
                aria-label='toggle password visibility'
                edge='end'
                type='button'
                onClick={onClear}
                size='small'
              >
                <ClearIcon fontSize='16' />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <button className={styles.button} type='submit'>
        <SearchIcon />
      </button>
    </form>
  )
}

export default InputSearch

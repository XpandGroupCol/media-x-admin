import Input from 'components/input'

const Select = ({ options, ...props }) => {
  return (
    <Input
      select
      SelectProps={{ native: true }}
      {...props}
    >
      <option value='default'>
        Seleccione una opcion
      </option>
      {options.map(({ id, label }) => (
        <option value={id} key={id}>
          {label}
        </option>
      ))}
    </Input>
  )
}

export default Select

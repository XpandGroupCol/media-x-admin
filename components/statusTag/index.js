const StatusTag = ({ status }) => {
  return status ? <span className='active'>Activo</span> : <span className='inactive'>Inactivo</span>
}

export default StatusTag

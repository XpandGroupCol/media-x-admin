import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiTooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { getEllipse } from 'utils'

const MediaTooltip = styled(({ className, ...props }) => (
  <MuiTooltip {...props} arrow classes={{ popper: className }} placement='top' />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 14,
    maxWidth: 200
  }
}))

const Tooltip = ({ text }) => {
  return (
    <MediaTooltip title={text}>
      <Typography component='span' sx={{ fontSize: 'inherit' }}>
        {getEllipse(text)}
      </Typography>
    </MediaTooltip>
  )
}

export default Tooltip

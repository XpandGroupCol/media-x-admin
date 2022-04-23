import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import Button from 'components/button'
import styles from './modal.module.css'
import CloseIcon from '@mui/icons-material/Close'
const ConfirmationModal = ({ open, onClose, onSubmit, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='responsive-dialog-title'
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle id='responsive-dialog-title' className={styles.title}>
        {title}
        <div className={styles.deleteIcon}>
          <IconButton size='small' onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>

      </DialogTitle>
      <DialogContent className={styles.modalContent}>
        {children}
      </DialogContent>

      <DialogActions className={styles.buttons}>
        <Button size='small' onClick={onClose} variant='outlined' color='secondary'>
          Cancelar
        </Button>
        <Button size='small' onClick={onSubmit}>
          Confirmar
        </Button>
      </DialogActions>

    </Dialog>
  )
}

export default ConfirmationModal

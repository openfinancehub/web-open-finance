import { createPortal } from 'react-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import useConfirm from '@/pages/Store/hooks/useConfirm'
import { StyledButton } from '@/components//button/StyledButton'

const ConfirmDialog = () => {
    const { onConfirm, onCancel, confirmState } = useConfirm()
    const portalElement = document.getElementById('root')

    const component = confirmState.show ? (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={confirmState.show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {confirmState.title}
            </DialogTitle>
            <DialogContent>
                <span>{confirmState.description}</span>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{confirmState.cancelButtonName}</Button>
                <StyledButton variant='contained' onClick={onConfirm}>
                    {confirmState.confirmButtonName}
                </StyledButton>
            </DialogActions>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

export default ConfirmDialog

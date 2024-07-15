import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

// material-ui
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

// store
import { HIDE_CANVAS_DIALOG, SHOW_CANVAS_DIALOG } from '@/pages/Store/store/actions'
import useNotifier from '@/pages/Store/utils/useNotifier'

// Project imports
import ChatFeedback from '@/components//extended/ChatFeedback'

const ChatFeedbackDialog = ({ show, dialogProps, onCancel }) => {
    const portalElement = document.getElementById('root')
    const dispatch = useDispatch()

    useNotifier()

    useEffect(() => {
        if (show) dispatch({ type: SHOW_CANVAS_DIALOG })
        else dispatch({ type: HIDE_CANVAS_DIALOG })
        return () => dispatch({ type: HIDE_CANVAS_DIALOG })
    }, [show, dispatch])

    const component = show ? (
        <Dialog
            onClose={onCancel}
            open={show}
            fullWidth
            maxWidth='sm'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
                {dialogProps.title || 'Allowed Domains'}
            </DialogTitle>
            <DialogContent>
                <ChatFeedback dialogProps={dialogProps} />
            </DialogContent>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

ChatFeedbackDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
}

export default ChatFeedbackDialog

import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Typography
} from '@mui/material';

const ToolDialog = ({ show, formData, onCancel, }) => {
    const handleSubmit = () => {
        // 处理表单提交逻辑，例如发送数据到服务器
        console.log(formValues);
        onClose(); // 关闭弹窗
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    return (
        <Dialog open={show} onClose={onCancel}>
            <DialogTitle sx={{ fontSize: '1rem', p: 3, pb: 0 }} id='alert-dialog-title'>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    Add New Tool
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    请填写以下表单数据
                </DialogContentText>
                {Object.keys(formData).map((key) => (
                    <TextField
                        key={key}
                        autoFocus
                        margin="dense"
                        id={key}
                        name={key}
                        label={key}
                        type="text"
                        value={formData[key] || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    取消
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    提交
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ToolDialog
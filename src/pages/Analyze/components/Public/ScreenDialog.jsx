import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Stack, OutlinedInput } from '@mui/material'
import { IconX, IconFileDownload, IconPlus } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { TooltipWithParser } from '@/components/tooltip/TooltipWithParser'
import { Grid } from '@/components//grid/Grid'
import { CodeEditor } from '@/components//editor/CodeEditor'
import { cloneDeep } from 'lodash'
import { GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { StyledButton } from '@/components//button/StyledButton'
import { generateRandomGradient, formatDataGridRows } from '@/pages/Store/utils/genericHelper'
import { useState, useEffect, useMemo, useCallback } from "react";
const ToolDialog = ({ show, dialogProps, onCancel, onConfirm, onDelete,saveData }) => {
    const customization = useSelector((state) => state.customization)   
    const [toolName, setToolName] = useState('')
    const [toolDesc, setToolDesc] = useState('')
    const [toolIcon, setToolIcon] = useState('')
    const [toolSchema, setToolSchema] = useState([])
    const [toolFunc, setToolFunc] = useState('')
    const deleteItem = useCallback(
        (id) => () => {
            setTimeout(() => {
                setToolSchema((prevRows) => prevRows.filter((row) => row.id !== id))
            })
        },
        []
    )
    const columns = useMemo(
        () => [
            { field: 'feature_name', headerName: 'FeatureName', editable: true, flex: 1 },

            { field: 'operator', headerName: 'Operator', editable: true, flex: 1 },
            {
                field: 'val',
                headerName: 'Val',
                editable: true,
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem key={'Delete'} icon={<DeleteIcon />} label='Delete' onClick={deleteItem(params.id)} />
                ]
            }
        ],
        [deleteItem]
    )
    const onRowUpdate = (newRow) => {
        setTimeout(() => {
            setToolSchema((prevRows) => {
                let allRows = [...cloneDeep(prevRows)]
                const indexToUpdate = allRows.findIndex((row) => row.id === newRow.id)
                if (indexToUpdate >= 0) {
                    allRows[indexToUpdate] = { ...newRow }
                }
                return allRows
            })
        })
    }
    useEffect(() => {
        if (dialogProps.type === 'EDIT' && dialogProps.data) {
            setToolName(dialogProps.data.name)
            setToolDesc(dialogProps.data.description)
            setToolIcon(dialogProps.data.iconSrc)
            setToolSchema(formatDataGridRows(dialogProps.data.schema))
        }

    }, [dialogProps])

    const addNewRow = () => {
        setTimeout(() => {
            setToolSchema((prevRows) => {
                let allRows = [...cloneDeep(prevRows)]
                const lastRowId = allRows.length ? allRows[allRows.length - 1].id + 1 : 1
                allRows.push({
                    id: lastRowId,
                    feature_name: '',
                    operator: '',
                    val: '',
                })
                return allRows
            })
        })
    }

    const deleteTool = () => {
        onDelete(dialogProps.data.id)
    }
    const saveTool = () => {
        onConfirm(toolSchema)
    }
    const saveChange = () => {
        const data = {
            id:dialogProps.data.id,
            name:toolName,
            description:toolDesc,
            iconSrc:toolIcon,
            schema:toolSchema,
            func:toolFunc
        }
        saveData(data)
    }
    return (
        <Dialog
            fullWidth
            maxWidth='md' open={show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle sx={{ fontSize: '1rem', p: 3, pb: 0 }} id='alert-dialog-title'>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {dialogProps.title}
                    {dialogProps.type === 'EDIT' && (
                        <StyledButton variant='outlined' onClick={() => saveTool()}>分析</StyledButton>
                    )}
                </Box>
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '75vh', position: 'relative', px: 3, pb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <Box>
                        <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                            <Typography variant='overline'>
                                Tool Name
                                <span style={{ color: 'red' }}>&nbsp;*</span>
                            </Typography>
                            <TooltipWithParser title={'Tool name must be small capital letter with underscore. Ex: my_tool'} />
                        </Stack>
                        <OutlinedInput
                            id='toolName'
                            type='string'
                            fullWidth
                            disabled={dialogProps.type === 'TEMPLATE'}
                            placeholder='My New Tool'
                            value={toolName}
                            name='toolName'
                            onChange={(e) => setToolName(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                            <Typography variant='overline'>
                                Tool description
                                <span style={{ color: 'red' }}>&nbsp;*</span>
                            </Typography>
                            <TooltipWithParser
                                title={'Description of what the tool does. This is for ChatGPT to determine when to use this tool.'}
                            />
                        </Stack>
                        <OutlinedInput
                            id='toolDesc'
                            type='string'
                            fullWidth
                            disabled={dialogProps.type === 'TEMPLATE'}
                            placeholder='Description of what the tool does. This is for ChatGPT to determine when to use this tool.'
                            multiline={true}
                            rows={3}
                            value={toolDesc}
                            name='toolDesc'
                            onChange={(e) => setToolDesc(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative' }} direction='row'>
                            <Typography variant='overline'>Tool Icon Source</Typography>
                        </Stack>
                        <OutlinedInput
                            id='toolIcon'
                            type='string'
                            fullWidth
                            disabled={dialogProps.type === 'TEMPLATE'}
                            placeholder='https://raw.githubusercontent.com/gilbarbara/logos/main/logos/airtable.svg'
                            value={toolIcon}
                            name='toolIcon'
                            onChange={(e) => setToolIcon(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative', justifyContent: 'space-between' }} direction='row'>
                            <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                                <Typography variant='overline'>Input Schema</Typography>
                                <TooltipWithParser title={'What is the input format in JSON?'} />
                            </Stack>
                            {dialogProps.type !== 'TEMPLATE' && (
                                <Button variant='outlined' onClick={addNewRow} startIcon={<IconPlus />}>
                                    Add Item
                                </Button>
                            )}
                        </Stack>
                        <Grid columns={columns} rows={toolSchema} disabled={dialogProps.type === 'TEMPLATE'} onRowUpdate={onRowUpdate} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                        <Typography variant='overline'>Javascript Function</Typography>
                        <TooltipWithParser title='Function to execute when tool is being used. You can use properties specified in Input Schema as variables. For example, if the property is <code>userid</code>, you can use as <code>$userid</code>. Return value must be a string. You can also override the code from API by following this <a target="_blank" href="https://docs.flowiseai.com/tools/custom-tool#override-function-from-api">guide</a>' />
                    </Stack>
                    <Stack direction='row'>
                        <Button
                            style={{ marginBottom: 10, marginRight: 10 }}
                            color='secondary'
                            variant='text'
                            onClick={() => setShowHowToDialog(true)}
                        >
                            How to use Function
                        </Button>
                        {dialogProps.type !== 'TEMPLATE' && (
                            <Button style={{ marginBottom: 10 }} variant='outlined' onClick={() => setToolFunc(exampleAPIFunc)}>
                                See Example
                            </Button>
                        )}
                    </Stack>
                </Box>
                <CodeEditor
                    disabled={dialogProps.type === 'TEMPLATE'}
                    value={toolFunc}
                    theme={customization.isDarkMode ? 'dark' : 'light'}
                    lang={'js'}
                    onValueChange={(code) => setToolFunc(code)}
                />
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                {dialogProps.type === 'EDIT' && (
                    <StyledButton color='error' variant='contained' onClick={() => deleteTool()}>
                        删除
                    </StyledButton>
                )}
                {dialogProps.type === 'TEMPLATE' && (
                    <StyledButton color='secondary' variant='contained' onClick={useToolTemplate}>
                        Use Template
                    </StyledButton>
                )}
                <StyledButton variant='contained' onClick={() => saveChange()}>
                    {dialogProps.confirmButtonName}
                </StyledButton>
            </DialogActions>
        </Dialog>
    )
}

export default ToolDialog
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar as enqueueSnackbarAction, closeSnackbar as closeSnackbarAction } from '@/pages/Store/store/actions'
import { cloneDeep } from 'lodash'

import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Stack, OutlinedInput } from '@mui/material'
import { StyledButton } from '@/pages/Store/ui-component/button/StyledButton'
import { Grid } from '@/pages/Store/ui-component/grid/Grid'
import { TooltipWithParser } from '@/pages/Store/ui-component/tooltip/TooltipWithParser'
import { GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmDialog from '@/pages/Store/ui-component/dialog/ConfirmDialog'
import { CodeEditor } from '@/pages/Store/ui-component/editor/CodeEditor'
import HowToUseFunctionDialog from './HowToUseFunctionDialog'

// Icons
import { IconX, IconFileDownload, IconPlus } from '@tabler/icons-react'

// API
import agentsApi from '@/pages/Store/api/agents'

// Hooks
import useConfirm from '@/pages/Store/hooks/useConfirm'
import useApi from '@/pages/Store/hooks/useApi'

// utils
import useNotifier from '@/pages/Store/utils/useNotifier'
import { generateRandomGradient, formatDataGridRows } from '@/pages/Store/utils/genericHelper'
import { HIDE_CANVAS_DIALOG, SHOW_CANVAS_DIALOG } from '@/pages/Store/store/actions'

const exampleAPIFunc = `/*
* You can use write your prompt here
*/

Role: You are a senior Stock Analyst
Goal: Analyze Input and infer helpfully for investing
Input:
{content}
you must respond in following format

Thought:  
- what entity is influenced mainly, entity must be in Chinese
- which level entity belong to, must one of [{types}]
- what financial indicator is influenced mainly, indicator must be in English
- what event is happenning to entity, event must be briefly in Chinese
- what sentiment is event, one of [Positive Negative Neural]
Result:
{{
    "consequence": [
        {{
            "entity": "",
            "event": "",        
            "level": "",
            "indicator": "",
            "sentiment": ""
        }}
    ]
}}

Let's begin! 
}`

const AgentDialog = ({ show, dialogProps, onUseTemplate, onCancel, onConfirm, setError }) => {
    const portalElement = document.getElementById('root')

    const customization = useSelector((state) => state.customization)
    const dispatch = useDispatch()

    // ==============================|| Snackbar ||============================== //

    useNotifier()
    const { confirm } = useConfirm()

    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args))
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args))

    const getSpecificAgentApi = useApi(agentsApi.getSpecificAgent)

    const [agentId, setAgentId] = useState('')
    const [agentName, setAgentName] = useState('')
    const [agentDesc, setAgentDesc] = useState('')
    const [agentIcon, setAgentIcon] = useState('')
    const [agentSchema, setAgentSchema] = useState([])
    const [agentPrompt, setAgentPrompt] = useState('')
    // const [showHowToDialog, setShowHowToDialog] = useState(false)

    const deleteItem = useCallback(
        (id) => () => {
            setTimeout(() => {
                setAgentSchema((prevRows) => prevRows.filter((row) => row.id !== id))
            })
        },
        []
    )

    const addNewRow = (stype) => {
        setTimeout(() => {
            setAgentSchema((prevRows) => {
                let allRows = [...cloneDeep(prevRows)]
                const lastRowId = allRows.length ? allRows[allRows.length - 1].id + 1 : 1
                allRows.push({
                    id: lastRowId,
                    type: stype,
                    name: '',
                    description: '',
                    required: false
                })
                return allRows
            })
        })
    }

    const onRowUpdate = (newRow) => {
        setTimeout(() => {
            setAgentSchema((prevRows) => {
                let allRows = [...cloneDeep(prevRows)]
                const indexToUpdate = allRows.findIndex((row) => row.id === newRow.id)
                if (indexToUpdate >= 0) {
                    allRows[indexToUpdate] = { ...newRow }
                }
                return allRows
            })
        })
    }

    const columns = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'Name',
                type: 'singleSelect',
                valueOptions: ['search', 'percept', 'analysis', 'date'],
                editable: true,
                flex: 1
                // width: 120
            },
            { field: 'description', headerName: 'Description', editable: true, flex: 1 },
            { field: 'required', headerName: 'Required', type: 'boolean', editable: true, width: 80 },
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
    useEffect(() => {
        if (show) dispatch({ type: SHOW_CANVAS_DIALOG })
        else dispatch({ type: HIDE_CANVAS_DIALOG })
        return () => dispatch({ type: HIDE_CANVAS_DIALOG })
    }, [show, dispatch])

    useEffect(() => {
        if (getSpecificAgentApi.data) {
            setAgentId(getSpecificAgentApi.data.id)
            setAgentName(getSpecificAgentApi.data.name)
            setAgentDesc(getSpecificAgentApi.data.description)
            setAgentSchema(formatDataGridRows(getSpecificAgentApi.data.schema))
            if (getSpecificAgentApi.data.func) setAgentPrompt(getSpecificAgentApi.data.func)
            else setAgentPrompt('')
        }
    }, [getSpecificAgentApi.data])

    useEffect(() => {
        if (getSpecificAgentApi.error) {
            setError(getSpecificAgentApi.error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSpecificAgentApi.error]) 

    useEffect(() => {
        if (dialogProps.type === 'EDIT' && dialogProps.data) {
            // When tool dialog is opened from Agents dashboard
            setAgentId(dialogProps.data.id)
            setAgentName(dialogProps.data.name)
            setAgentDesc(dialogProps.data.description)
            setAgentIcon(dialogProps.data.iconSrc)
            setAgentSchema(formatDataGridRows(dialogProps.data.schema))
            if (dialogProps.data.func) setAgentPrompt(dialogProps.data.func)
            else setAgentPrompt('')
        } else if (dialogProps.type === 'EDIT' && dialogProps.agentId) {
            // When tool dialog is opened from CustomAgent node in canvas
            getSpecificAgentApi.request(dialogProps.agentId)
        } else if (dialogProps.type === 'IMPORT' && dialogProps.data) {
            // When tool dialog is to import existing tool
            setAgentName(dialogProps.data.name)
            setAgentDesc(dialogProps.data.description)
            setAgentIcon(dialogProps.data.iconSrc)
            setAgentSchema(formatDataGridRows(dialogProps.data.schema))
            if (dialogProps.data.func) setAgentPrompt(dialogProps.data.func)
            else setAgentPrompt('')
        } else if (dialogProps.type === 'TEMPLATE' && dialogProps.data) {
            // When tool dialog is a template
            setAgentName(dialogProps.data.name)
            setAgentDesc(dialogProps.data.description)
            setAgentIcon(dialogProps.data.iconSrc)
            setAgentSchema(formatDataGridRows(dialogProps.data.schema))
            if (dialogProps.data.func) setAgentPrompt(dialogProps.data.func)
            else setAgentPrompt('')
        } else if (dialogProps.type === 'ADD') {
            // When tool dialog is to add a new tool
            setAgentId('')
            setAgentName('')
            setAgentDesc('')
            setAgentIcon('')
            setAgentSchema([])
            setAgentPrompt('')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogProps])

    const useAgentTemplate = () => {
        onUseTemplate(dialogProps.data)
    }

    const exportAgent = async () => {
        try {
            const toolResp = await agentsApi.getSpecificAgent(agentId)
            if (toolResp.data) {
                const toolData = toolResp.data
                delete toolData.id
                delete toolData.createdDate
                delete toolData.updatedDate
                let dataStr = JSON.stringify(toolData, null, 2)
                let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

                let exportFileDefaultName = `${agentName}-CustomAgent.json`

                let linkElement = document.createElement('a')
                linkElement.setAttribute('href', dataUri)
                linkElement.setAttribute('download', exportFileDefaultName)
                linkElement.click()
            }
        } catch (error) {
            enqueueSnackbar({
                message: `Failed to export Agent: ${
                    typeof error.response.data === 'object' ? error.response.data.message : error.response.data
                }`,
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            onCancel()
        }
    }

    const addNewAgent = async () => {
        try {
            const obj = {
                name: agentName,
                description: agentDesc,
                color: generateRandomGradient(),
                schema: JSON.stringify(agentSchema),
                func: agentPrompt,
                iconSrc: agentIcon
            }
            const createResp = await agentsApi.createNewAgent(obj)
            if (createResp.data) {
                enqueueSnackbar({
                    message: 'New Agent added',
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                onConfirm(createResp.data.id)
            }
        } catch (error) {
            enqueueSnackbar({
                message: `Failed to add new Agent: ${
                    typeof error.response.data === 'object' ? error.response.data.message : error.response.data
                }`,
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            onCancel()
        }
    }

    const saveAgent = async () => {
        try {
            const saveResp = await agentsApi.updateAgent(agentId, {
                name: agentName,
                description: agentDesc,
                schema: JSON.stringify(agentSchema),
                func: agentPrompt,
                iconSrc: agentIcon
            })
            if (saveResp.data) {
                enqueueSnackbar({
                    message: 'Agent saved',
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                onConfirm(saveResp.data.id)
            }
        } catch (error) {
            enqueueSnackbar({
                message: `Failed to save Agent: ${
                    typeof error.response.data === 'object' ? error.response.data.message : error.response.data
                }`,
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                    persist: true,
                    action: (key) => (
                        <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                            <IconX />
                        </Button>
                    )
                }
            })
            onCancel()
        }
    }

    const deleteAgent = async () => {
        const confirmPayload = {
            title: `Delete Agent`,
            description: `Delete agent ${agentName}?`,
            confirmButtonName: 'Delete',
            cancelButtonName: 'Cancel'
        }
        const isConfirmed = await confirm(confirmPayload)

        if (isConfirmed) {
            try {
                const delResp = await agentsApi.deleteAgent(agentId)
                if (delResp.data) {
                    enqueueSnackbar({
                        message: 'Agent deleted',
                        options: {
                            key: new Date().getTime() + Math.random(),
                            variant: 'success',
                            action: (key) => (
                                <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                    <IconX />
                                </Button>
                            )
                        }
                    })
                    onConfirm()
                }
            } catch (error) {
                enqueueSnackbar({
                    message: `Failed to delete Agent: ${
                        typeof error.response.data === 'object' ? error.response.data.message : error.response.data
                    }`,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: 'error',
                        persist: true,
                        action: (key) => (
                            <Button style={{ color: 'white' }} onClick={() => closeSnackbar(key)}>
                                <IconX />
                            </Button>
                        )
                    }
                })
                onCancel()
            }
        }
    }
    console.log("enter dialog show: ", show)
    console.log("agentSchema: ", agentSchema)
    const component = show ? (
        <Dialog
            fullWidth
            maxWidth='md'
            open={show}
            onClose={onCancel}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle sx={{ fontSize: '1rem', p: 3, pb: 0 }} id='alert-dialog-title'>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {dialogProps.title}
                    {dialogProps.type === 'EDIT' && (
                        <Button variant='outlined' onClick={() => exportAgent()} startIcon={<IconFileDownload />}>
                            Export
                        </Button>
                    )}
                </Box>
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '75vh', position: 'relative', px: 3, pb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <Box>
                        <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                            <Typography variant='overline'>
                                Agent Name
                                <span style={{ color: 'red' }}>&nbsp;*</span>
                            </Typography>
                            <TooltipWithParser title={'Agent name must be small capital letter with underscore. Ex: my_tool'} />
                        </Stack>
                        <OutlinedInput
                            id='agentName'
                            type='string'
                            fullWidth
                            disabled={dialogProps.type === 'TEMPLATE'}
                            placeholder='My New Agent'
                            value={agentName}
                            name='agentName'
                            onChange={(e) => setAgentName(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                            <Typography variant='overline'>
                                Agent description
                                <span style={{ color: 'red' }}>&nbsp;*</span>
                            </Typography>
                            <TooltipWithParser
                                title={'Description of what the tool does. This is for ChatGPT to determine when to use this tool.'}
                            />
                        </Stack>
                        <OutlinedInput
                            id='agentDesc'
                            type='string'
                            fullWidth
                            disabled={dialogProps.type === 'TEMPLATE'}
                            placeholder='Description of what the tool does. This is for ChatGPT to determine when to use this tool.'
                            multiline={true}
                            rows={3}
                            value={agentDesc}
                            name='agentDesc'
                            onChange={(e) => setAgentDesc(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative' }} direction='row'>
                            <Typography variant='overline'>Agent Icon Source</Typography>
                        </Stack>
                        <OutlinedInput
                            id='agentIcon'
                            type='string'
                            fullWidth
                            disabled={dialogProps.type === 'TEMPLATE'}
                            placeholder='https://raw.githubusercontent.com/gilbarbara/logos/main/logos/airtable.svg'
                            value={agentIcon}
                            name='agentIcon'
                            onChange={(e) => setAgentIcon(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative', justifyContent: 'space-between' }} direction='row'>
                            <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                                <Typography variant='overline'> Agents </Typography>
                                <TooltipWithParser title={'What is the input format in JSON?'} />
                            </Stack>
                            {dialogProps.type !== 'TEMPLATE' && (
                                <Button variant='outlined' onClick={() => addNewRow("tool")} startIcon={<IconPlus />}>
                                    Add Item
                                </Button>
                            )}
                        </Stack>
                        <Grid columns={columns} rows={agentSchema.filter((a) => a.type === 'tool')} disabled={dialogProps.type === 'TEMPLATE'} onRowUpdate={onRowUpdate} />
                    </Box>
                    <Box>
                        <Stack sx={{ position: 'relative', justifyContent: 'space-between' }} direction='row'>
                            <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                                <Typography variant='overline'> Skills </Typography>
                                <TooltipWithParser title={'What is the input format in JSON?'} />
                            </Stack>
                            {dialogProps.type !== 'TEMPLATE' && (
                                <Button variant='outlined' onClick={() => addNewRow("skill")} startIcon={<IconPlus />}>
                                    Add Item
                                </Button>
                            )}
                        </Stack>
                        <Grid columns={columns} rows={agentSchema.filter((a) => a.type === 'skill')} disabled={dialogProps.type === 'TEMPLATE'} onRowUpdate={onRowUpdate} />
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Stack sx={{ position: 'relative', alignItems: 'center' }} direction='row'>
                                <Typography variant='overline'>Agent Prompt</Typography>
                                <TooltipWithParser title='Write prompts for agent role' />
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
                                    <Button style={{ marginBottom: 10 }} variant='outlined' onClick={() => setAgentPrompt(exampleAPIFunc)}>
                                        Default Prompt
                                    </Button>
                                )}
                            </Stack>
                        </Box>
                        <CodeEditor
                            disabled={dialogProps.type === 'TEMPLATE'}
                            value={agentPrompt}
                            theme={customization.isDarkMode ? 'dark' : 'light'}
                            lang={'js'}
                            onValueChange={(code) => setAgentPrompt(code)}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                {dialogProps.type === 'EDIT' && (
                    <StyledButton color='error' variant='contained' onClick={() => deleteAgent()}>
                        Delete
                    </StyledButton>
                )}
                {dialogProps.type === 'TEMPLATE' && (
                    <StyledButton color='secondary' variant='contained' onClick={useAgentTemplate}>
                        Use Template
                    </StyledButton>
                )}
                {dialogProps.type !== 'TEMPLATE' && (
                    <StyledButton
                        disabled={!(agentName && agentDesc)}
                        variant='contained'
                        onClick={() => (dialogProps.type === 'ADD' || dialogProps.type === 'IMPORT' ? addNewAgent() : saveAgent())}
                    >
                        {dialogProps.confirmButtonName}
                    </StyledButton>
                )}
            </DialogActions>
            <ConfirmDialog />
        </Dialog>
    ) : null
    console.log("component", component)
    return createPortal(component, portalElement)
}

AgentDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onUseTemplate: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    setError: PropTypes.func
}

export default AgentDialog

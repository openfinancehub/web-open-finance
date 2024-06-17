import { useEffect, useState, useRef } from 'react'

// material-ui
import { Box, Stack, Button, ButtonGroup, Skeleton } from '@mui/material'

// project imports
import MainCard from '@/pages/Store/ui-component/cards/MainCard'
import ItemCard from '@/pages/Store/ui-component/cards/ItemCard'
import { gridSpacing } from '@/pages/Store/store/constant'
import AgentEmptySVG from '@/pages/Store/assets/images/tools_empty.svg'
import { StyledButton } from '@/pages/Store/ui-component/button/StyledButton'
import AgentDialog from './AgentsDialog'

// API
import agentsApi from '@/pages/Store/api/agents'

// Hooks
import useApi from '@/pages/Store/hooks/useApi'

// icons
import { IconPlus, IconFileUpload } from '@tabler/icons-react'
import ViewHeader from '@/pages/Store/layout/MainLayout/ViewHeader'
import ErrorBoundary from '@/pages/Store/ErrorBoundary'

// ==============================|| CHATFLOWS ||============================== //

const Agents = () => {
    const getAllAgentsApi = useApi(agentsApi.getAllAgents)

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState({})

    const inputRef = useRef(null)

    const onUploadFile = (file) => {
        try {
            const dialogProp = {
                title: 'Add New Agent',
                type: 'IMPORT',
                cancelButtonName: 'Cancel',
                confirmButtonName: 'Save',
                data: JSON.parse(file)
            }
            setDialogProps(dialogProp)
            setShowDialog(true)
        } catch (e) {
            console.error(e)
        }
    }

    const handleFileUpload = (e) => {
        if (!e.target.files) return

        const file = e.target.files[0]

        const reader = new FileReader()
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return
            }
            const { result } = evt.target
            onUploadFile(result)
        }
        reader.readAsText(file)
    }

    const addNew = () => {
        const dialogProp = {
            title: 'Add New Agent',
            type: 'ADD',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Add'
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const edit = (selectedAgent) => {
        const dialogProp = {
            title: 'Edit Agent',
            type: 'EDIT',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Save',
            data: selectedAgent
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const onConfirm = () => {
        setShowDialog(false)
        getAllAgentsApi.request()
    }

    useEffect(() => {
        getAllAgentsApi.request()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(getAllAgentsApi.loading)
    }, [getAllAgentsApi.loading])

    useEffect(() => {
        if (getAllAgentsApi.error) {
            setError(getAllAgentsApi.error)
        }
    }, [getAllAgentsApi.error])

    console.log("Agents showDialog: ", showDialog)
    return (
        <>
            <MainCard>
                {error ? (
                    <ErrorBoundary error={error} />
                ) : (
                    <Stack flexDirection='column' sx={{ gap: 3 }}>
                        <ViewHeader title='Agents'>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    variant='outlined'
                                    onClick={() => inputRef.current.click()}
                                    startIcon={<IconFileUpload />}
                                    sx={{ borderRadius: 2, height: 40 }}
                                >
                                    Load
                                </Button>
                                <input
                                    style={{ display: 'none' }}
                                    ref={inputRef}
                                    type='file'
                                    hidden
                                    accept='.json'
                                    onChange={(e) => handleFileUpload(e)}
                                />
                            </Box>
                            <ButtonGroup disableElevation aria-label='outlined primary button group'>
                                <StyledButton
                                    variant='contained'
                                    onClick={addNew}
                                    startIcon={<IconPlus />}
                                    sx={{ borderRadius: 2, height: 40 }}
                                >
                                    Create
                                </StyledButton>
                            </ButtonGroup>
                        </ViewHeader>
                        {isLoading ? (
                            <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={gridSpacing}>
                                <Skeleton variant='rounded' height={160} />
                                <Skeleton variant='rounded' height={160} />
                                <Skeleton variant='rounded' height={160} />
                            </Box>
                        ) : (
                            <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={gridSpacing}>
                                {getAllAgentsApi.data &&
                                    getAllAgentsApi.data.map((data, index) => (
                                        <ItemCard data={data} key={index} onClick={() => edit(data)} />
                                    ))}
                            </Box>
                        )}
                        {!isLoading && (!getAllAgentsApi.data || getAllAgentsApi.data.length === 0) && (
                            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                                <Box sx={{ p: 2, height: 'auto' }}>
                                    <img
                                        style={{ objectFit: 'cover', height: '20vh', width: 'auto' }}
                                        src={AgentEmptySVG}
                                        alt='AgentEmptySVG'
                                    />
                                </Box>
                                <div>No Agents Created Yet</div>
                            </Stack>
                        )}
                    </Stack>
                )}
            </MainCard>
            <AgentDialog
                show={showDialog}
                dialogProps={dialogProps}
                onCancel={() => setShowDialog(false)}
                onConfirm={onConfirm}
                setError={setError}
            ></AgentDialog>
        </>
    )
}

export default Agents

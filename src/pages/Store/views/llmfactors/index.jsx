import { useEffect, useState, useRef } from 'react'

// material-ui
import { Box, Stack, Button, ButtonGroup, Skeleton } from '@mui/material'

// project imports
import MainCard from '@/components//cards/MainCard'
import ItemCard from '@/components//cards/ItemCard'
import { gridSpacing } from '@/pages/Store/store/constant'
import ToolEmptySVG from '@/components/assets/images/tools_empty.svg'
import { StyledButton } from '@/components//button/StyledButton'
import ToolDialog from './ToolDialog'

// API
import llmfactorsApi from '@/pages/Store/api/llmfactors'

// Hooks
import useApi from '@/pages/Store/hooks/useApi'

// icons
import { IconPlus, IconFileUpload } from '@tabler/icons-react'
import ViewHeader from '@/components/layout/MainLayout/ViewHeader'
import ErrorBoundary from '@/pages/Store/ErrorBoundary'

// ==============================|| CHATFLOWS ||============================== //

const Tools = () => {
    const getAllLlmfactorsApi = useApi(llmfactorsApi.getAllLlmfactors)

    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showDialog, setShowDialog] = useState(false)
    const [dialogProps, setDialogProps] = useState({})

    const inputRef = useRef(null)

    const onUploadFile = (file) => {
        try {
            const dialogProp = {
                title: 'Add New Tool',
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
            title: 'Add New Tool',
            type: 'ADD',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Add'
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const edit = (selectedTool) => {
        const dialogProp = {
            title: 'Edit Tool',
            type: 'EDIT',
            cancelButtonName: 'Cancel',
            confirmButtonName: 'Save',
            data: selectedTool
        }
        setDialogProps(dialogProp)
        setShowDialog(true)
    }

    const onConfirm = () => {
        setShowDialog(false)
        getAllLlmfactorsApi.request()
    }

    useEffect(() => {
        getAllLlmfactorsApi.request()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(getAllLlmfactorsApi.loading)
    }, [getAllLlmfactorsApi.loading])

    useEffect(() => {
        if (getAllLlmfactorsApi.error) {
            setError(getAllLlmfactorsApi.error)
        }
    }, [getAllLlmfactorsApi.error])

    console.error("Agents showDialog: ", showDialog)

    return (
        <>
            <MainCard>
                {error ? (
                    <ErrorBoundary error={error} />
                ) : (
                    <Stack flexDirection='column' sx={{ gap: 3 }}>
                        <ViewHeader title='LlmFactor'>
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
                                {getAllLlmfactorsApi.data &&
                                    getAllLlmfactorsApi.data.map((data, index) => (
                                        <ItemCard data={data} key={index} onClick={() => edit(data)} />
                                    ))}
                            </Box>
                        )}
                        {!isLoading && (!getAllLlmfactorsApi.data || getAllLlmfactorsApi.data.length === 0) && (
                            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
                                <Box sx={{ p: 2, height: 'auto' }}>
                                    <img
                                        style={{ objectFit: 'cover', height: '20vh', width: 'auto' }}
                                        src={ToolEmptySVG}
                                        alt='ToolEmptySVG'
                                    />
                                </Box>
                                <div>No Tools Created Yet</div>
                            </Stack>
                        )}
                    </Stack>
                )}
            </MainCard>
            <ToolDialog
                show={showDialog}
                dialogProps={dialogProps}
                onCancel={() => setShowDialog(false)}
                onConfirm={onConfirm}
                setError={setError}
            ></ToolDialog>
        </>
    )
}

export default Tools

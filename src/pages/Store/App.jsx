import { useSelector } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

// routing
// import Routes from '@/pages/Store/routes'
import MainLayout from '@/pages/Store/layout/MainLayout'

// defaultTheme
import themes from '@/pages/Store/themes'

// project imports
import NavigationScroll from '@/pages/Store/layout/NavigationScroll'

// ==============================|| APP ||============================== //

const App = () => {
    console.log("APP")
    const customization = useSelector((state) => state.customization)
    console.log("here")
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <MainLayout />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App

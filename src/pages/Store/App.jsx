import { useSelector } from 'react-redux'
import React from 'react';

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

// routing
// import Routes from '@/pages/Store/routes'
import MainLayout from '@/components/layout/MainLayout'

// defaultTheme
import themes from '@/components/themes'
import menuItem from '@/pages/Store/menu-items'

// project imports
import NavigationScroll from '@/components/layout/NavigationScroll'

// ==============================|| APP ||============================== //

const App = () => {
    // console.log("APP")
    const customization = useSelector((state) => state.customization)
    // console.log("here")
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <MainLayout menulist={menuItem}/>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App

import React from 'react'
import App from '@/pages/Analyze/App'
import { store } from '@/pages/Store/store'
// style + assets
import '@/components/assets/scss/style.scss'

// third party

import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import ConfirmContextProvider from '@/pages/Store/store/context/ConfirmContextProvider'
import { ReactFlowContext } from '@/pages/Store/store/context/ReactFlowContext'


const Analyze = () => { 
    // console.log("Store")
    return (
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider>
                <ConfirmContextProvider>
                    <ReactFlowContext>
                        <App />
                    </ReactFlowContext>
                </ConfirmContextProvider>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>
    );
  };
  
  export default Analyze;
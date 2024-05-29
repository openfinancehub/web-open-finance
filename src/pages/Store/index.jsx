import React from 'react'
import App from '@/pages/Store/App'
import { store } from '@/pages/Store/store'
// style + assets
import '@/pages/Store/assets/scss/style.scss'

// third party

import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import ConfirmContextProvider from '@/pages/Store/store/context/ConfirmContextProvider'
import { ReactFlowContext } from '@/pages/Store/store/context/ReactFlowContext'


const Store = () => { 
    console.log("Store")
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
  
  export default Store;
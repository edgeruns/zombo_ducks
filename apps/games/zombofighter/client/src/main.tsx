import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './app'
import { store } from './store'

import './global.module.scss'

const rootNode = document.getElementById('root')
const root = ReactDOM.createRoot(rootNode as HTMLElement)

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)

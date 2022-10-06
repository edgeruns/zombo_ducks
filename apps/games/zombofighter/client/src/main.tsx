import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import '@apps/bar/styles/global.module.scss'

import { store } from '@apps/bar/data'
import { Game } from '@apps/bar/components'

const rootNode = document.getElementById('root')
const root = ReactDOM.createRoot(rootNode as HTMLElement)

root.render(
    <StrictMode>
        <Provider store={store}>
            <Game />
        </Provider>
    </StrictMode>
)

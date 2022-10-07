import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './global.module.scss'

import { store } from '@apps/games-zombofighter-client-data'
import { Game } from '@apps/games-zombofighter-client-components'

const rootNode = document.getElementById('root')
const root = ReactDOM.createRoot(rootNode as HTMLElement)

root.render(
    <StrictMode>
        <Provider store={store}>
            <Game />
        </Provider>
    </StrictMode>
)

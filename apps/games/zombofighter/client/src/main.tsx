import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { App } from './app'
import { store } from './store'

import './global.module.scss'

const rootNode = document.getElementById('root')
const root = ReactDOM.createRoot(rootNode as HTMLElement)

root.render(
    <MemoryRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </MemoryRouter>
)

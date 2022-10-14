import { Middleware } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SocketMock from 'socket.io-mock'

import searchGame from '@apps/games/zombofighter/client/features/search-game'

import { store } from './index'

enum Events {
    START_SEARCH = 'START_SEARCH',
    GAME_FOUND = 'GAME_FOUND'
}

type GameFoundData = {
    id: string
}

const socketMock = new SocketMock()

socketMock.on(Events.START_SEARCH, () => {
    setTimeout(() => {
        socketMock.emit(Events.GAME_FOUND, { id: '12' })
    }, 3000)
})

export function socketMiddleware(): Middleware {
    const client: Socket = socketMock.socketClient

    client.on(Events.GAME_FOUND, (data: GameFoundData) => {
        store.dispatch(searchGame.actions.found({ gameId: data.id }))
    })

    return () => next => action => {
        switch (action.type) {
            case 'searchGame/start':
                client.emit(Events.START_SEARCH)

                break
        }

        next(action)
    }
}

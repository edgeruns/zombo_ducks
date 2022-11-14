import { Web3 } from '@apps/fighter/crypto-api'
import { Buffer } from 'buffer'

import { getNearProvider } from './near.provider'

window.Buffer = window.Buffer || Buffer

export const web3 = new Web3().addProvider(getNearProvider())

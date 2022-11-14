import { NearConnectContainer } from '@apps/fighter/client/features/auth'

import styles from './styles.module.scss'

export const ConnectWallet = () => {
    return (
        <div className={styles.root}>
            <NearConnectContainer />
        </div>
    )
}

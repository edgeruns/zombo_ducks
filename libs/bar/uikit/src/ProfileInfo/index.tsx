import React, { FC } from 'react'

import styles from './ProfileInfo.module.scss'

type ProfileInfoProps = {
    avatar: string
    nickname: string
}

export const ProfileInfo: FC<ProfileInfoProps> = props => {
    const { avatar, nickname } = props

    return (
        <div className={styles.root}>
            <img
                className={styles.avatar}
                src={avatar}
                alt={nickname}
            />

            <span className={styles.nickname}>
                {nickname}
            </span>
        </div>
    )
}

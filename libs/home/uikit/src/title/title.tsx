import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './title.module.scss'

export interface TitleProps {
  className?: string
}

export const Title: FC<PropsWithChildren<TitleProps>> = ({ className, children }) => {
  return <div className={classNames(className, styles.root)}>{children}</div>
}

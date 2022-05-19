import classNames from 'classnames/bind'
import { FC, PropsWithChildren } from 'react'

import styles from './button.module.scss'

interface ButtonProps {
  variant: 'primary' | 'secondary'
  className?: string
}

const cx = classNames.bind(styles)

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  variant,
  children,
}) => {
  const rootClassName = cx('root', className, {
    primary: variant === 'primary',
    secondary: variant === 'secondary',
  })

  return <div className={rootClassName}>{children}</div>
}

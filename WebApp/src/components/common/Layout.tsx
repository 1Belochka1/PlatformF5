import classnames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import Header from './Header/Header'
import styles from './Layout.module.scss'

interface ILayout {
	headerIsVisible: boolean
}

const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	headerIsVisible,
}) => {
	return (
		<div
			className={classnames(styles.wrapper, {
				[styles.wrapperContentCenter]: !headerIsVisible,
			})}
		>
			{headerIsVisible && <Header />}
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default Layout

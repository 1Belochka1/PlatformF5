import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'
import styles from '../TasksPage.module.scss'

interface ITabNavItem {
	id: string
	title: string
	activeTab: string
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const TabNavItem: FC<PropsWithChildren<ITabNavItem>> = ({
	id,
	title,
	activeTab,
	setActiveTab,
}) => {
	const handleClick = () => {
		setActiveTab(id)
	}

	return (
		<li
			onClick={handleClick}
			className={classNames(styles.tabNavItem, {
				[styles.active]: activeTab === id,
			})}
		>
			{title}
		</li>
	)
}
export default TabNavItem

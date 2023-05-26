import { FC, PropsWithChildren } from 'react'

interface ITabContent {
	id: string
	activeTab: string
}

const TabContent: FC<PropsWithChildren<ITabContent>> = ({
	id,
	activeTab,
	children,
}) => {
	return activeTab === id ? <>{children}</> : null
}

export default TabContent

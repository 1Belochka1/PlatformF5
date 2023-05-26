import { FC, useState } from 'react'
import Layout from '../../common/Layout'

import { useAuth } from '../../../hooks/useAuth'
import TabContent from './TabNavigation/TabContent'
import TabNavItem from './TabNavigation/TabNavItem'
import TaskAll from './TaskAll/TaskAll'
import TaskAvailable from './TaskAvailable/TaskAvailable'
import TaskUser from './TaskUser/TaskUser'
import styles from './TasksPage.module.scss'

const TasksPage: FC = () => {
	const { idRole } = useAuth()
	const [displayTasks, setDisplayTasks] = useState(
		idRole && idRole < 3 ? 'TaskAll' : 'TaskAvailable'
	)

	return (
		<Layout headerIsVisible>
			<div className={styles.wrapper}>
				<div className={styles.buttons}>
					{idRole && idRole <= 2 && (
						<TabNavItem
							id='TaskAll'
							activeTab={displayTasks}
							setActiveTab={setDisplayTasks}
							title='Все задания'
						/>
					)}

					{idRole && idRole > 2 && (
						<>
							<TabNavItem
								id='TaskAvailable'
								activeTab={displayTasks}
								setActiveTab={setDisplayTasks}
								title='Все доступные задания'
							/>
							<TabNavItem
								id='TaskUser'
								activeTab={displayTasks}
								setActiveTab={setDisplayTasks}
								title='Текущие задания'
							/>
						</>
					)}
				</div>
				{idRole && idRole <= 2 && (
					<TabContent id='TaskAll' activeTab={displayTasks}>
						<TaskAll />
					</TabContent>
				)}

				{idRole && idRole > 2 && (
					<>
						<TabContent id='TaskAvailable' activeTab={displayTasks}>
							<TaskAvailable />
						</TabContent>
						<TabContent id='TaskUser' activeTab={displayTasks}>
							<TaskUser />
						</TabContent>
					</>
				)}
			</div>
		</Layout>
	)
}

export default TasksPage

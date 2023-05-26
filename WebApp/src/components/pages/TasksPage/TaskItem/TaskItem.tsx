import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import styles from './TaskItem.module.scss'

interface ITaskItem {
	idTasks: number
	title: string
	description: string
	deadline: Date
	status: string
}

const TaskItem: FC<ITaskItem> = ({
	title,
	deadline,
	description,
	idTasks,
	status,
}) => {
	const navigate = useNavigate()

	const goToTask = () => navigate(`/task/${idTasks}`)

	var dateDeadline = new Date(deadline)
	return (
		<div className={styles.wrapper} onClick={() => goToTask()}>
			<div className={styles.title}>{title}</div>
			<div className={styles.description}>{description}</div>
			<div>Дата сдачи: {dateDeadline.toISOString().split('T')[0]}</div>
			<div>
				Статус: <span>{status}</span>
			</div>
		</div>
	)
}

export default TaskItem

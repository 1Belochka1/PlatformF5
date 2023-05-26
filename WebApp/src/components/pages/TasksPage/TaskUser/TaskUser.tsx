import { FC, useEffect } from 'react'
import { useGetAllTasksByUserIdQuery } from '../../../../services/TasksService'
import TaskList from '../TaskList/TaskList'
import styles from './TaskUser.module.scss'
const TaskUser: FC = () => {
	const { data, isLoading, isError, refetch } = useGetAllTasksByUserIdQuery()
	useEffect(() => {
		refetch()
	}, [])
	return (
		<div className={styles.wrapper}>
			<TaskList list={data} isLoading={isLoading} isError={isError} />
		</div>
	)
}

export default TaskUser

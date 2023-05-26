import { FC, useEffect } from 'react'
import { useGetTasksNoUsersQuery } from '../../../../services/TasksService'
import TaskList from '../TaskList/TaskList'

const TaskAvailable: FC = () => {
	const { data, isLoading, isError, refetch } = useGetTasksNoUsersQuery()
	useEffect(() => {
		refetch()
	}, [])
	return (
		<div>
			<TaskList list={data} isLoading={isLoading} isError={isError} />
		</div>
	)
}

export default TaskAvailable

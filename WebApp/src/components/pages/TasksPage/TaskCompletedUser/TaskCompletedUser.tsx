import { FC, useEffect } from 'react'
import { useGetTasksCompletedByUserIdQuery } from '../../../../services/TasksService'
import TaskList from '../TaskList/TaskList'

const TaskCompletedUser: FC = () => {
	const { data, isLoading, isError, refetch } =
		useGetTasksCompletedByUserIdQuery()

	useEffect(() => {
		refetch()
	}, [])

	return (
		<div>
			<TaskList list={data} isLoading={isLoading} isError={isError} />
		</div>
	)
}

export default TaskCompletedUser

import { FC } from 'react'
import { useGetAllTasksQuery } from '../../../../services/TasksService'
import TaskList from '../TaskList/TaskList'

const TaskAll: FC = () => {
	const { data, isLoading, isError } = useGetAllTasksQuery()
	return (
		<div>
			<TaskList list={data} isLoading={isLoading} isError={isError} />
		</div>
	)
}

export default TaskAll

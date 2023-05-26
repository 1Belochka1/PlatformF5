import { FC } from 'react'
import { ITask } from '../../../../models/ITask'
import Message from '../../../ui/HandlerMessage/HandlerMessage'
import TaskItem from '../TaskItem/TaskItem'
import styles from './TaskList.module.scss'

interface ITaskList {
	list: ITask[] | undefined
	isLoading: boolean
	isError: boolean
}

const TaskList: FC<ITaskList> = ({ list, isLoading, isError }) => {
	return (
		<div className={styles.wrapper}>
			{isLoading && <Message type='loading' />}
			{list &&
				(list.length > 0 ? (
					list.map(task => {
						return (
							<TaskItem
								key={task.idTasks}
								title={task.title}
								description={task.description}
								deadline={task.deadline}
								status={task.idStatusNavigation.name}
								idTasks={task.idTasks}
							/>
						)
					})
				) : (
					<Message message='Заданий нет' type='message' />
				))}
			{isError && (
				<Message
					message='На сервере произошла ошибка, повторите попытку позже'
					type='error'
				/>
			)}
		</div>
	)
}

export default TaskList

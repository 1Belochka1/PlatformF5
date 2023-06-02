import React, { FC, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '../../../hooks/useAuth'
import { ITask } from '../../../models/ITask'
import { useGetStatusQuery } from '../../../services/StatusService'
import {
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from '../../../services/TasksService'
import { IUpdateTask } from '../../../services/interface/IUpdateTask'
import { TextBig, TextNormal } from '../Auth/styled'
import { ButtonPressable, ButtonText, ButtonView, TaskView } from './styled'

const SingleTask: FC<{ task: ITask; allTasks: boolean }> = ({
	task,
	allTasks,
}) => {
	const [buttonIsVisible, setButtonIsVisible] = useState(false)

	const { data, isError } = useGetStatusQuery()

	const { idUser } = useAuth()

	const [updateTaskMutation, { isError: updateTaskIsError }] =
		useUpdateTaskMutation()

	const [deleteTaskMutation] = useDeleteTaskMutation()

	const completedTaskHandle = async () => {
		deleteTaskMutation(`${task.idTasks}`)
	}

	const takeTaskHandle = async () => {
		const updateTask: IUpdateTask = {
			idUsers: idUser,
			deadline: task.deadline,
			description: task.description,
			idStatus: 2,
		}
		await updateTaskMutation({ id: `${task.idTasks}`, body: updateTask })
	}

	const backTaskHandle = async () => {
		const updateTask: IUpdateTask = {
			idUsers: null,
			deadline: task.deadline,
			description: task.description,
			idStatus: 1,
		}
		await updateTaskMutation({ id: `${task.idTasks}`, body: updateTask })
	}

	return (
		<TaskView>
			<TouchableOpacity
				style={{ marginBottom: 10 }}
				onPress={() => setButtonIsVisible(prev => !prev)}
			>
				<TextBig>{task.title}</TextBig>
				<TextNormal>{task.description}</TextNormal>
				<TextNormal>
					{data?.filter(status => status.idStatus === task.idStatus)[0].name}
				</TextNormal>
				{updateTaskIsError && (
					<TextNormal>Не удалось обновить задание</TextNormal>
				)}
				{isError && <TextNormal>Не удалось получить статус задания</TextNormal>}
			</TouchableOpacity>
			{buttonIsVisible &&
				(allTasks ? (
					<ButtonPressable
						onPress={() => {
							takeTaskHandle()
						}}
					>
						<ButtonText>взять задание</ButtonText>
					</ButtonPressable>
				) : (
					<ButtonView>
						<ButtonPressable
							onPress={() => {
								completedTaskHandle()
							}}
						>
							<ButtonText>сдать готовое задание</ButtonText>
						</ButtonPressable>
						<ButtonPressable
							style={{ backgroundColor: '#DA1E1E' }}
							onPress={() => {
								backTaskHandle()
							}}
						>
							<ButtonText>отменить выполнение задания</ButtonText>
						</ButtonPressable>
					</ButtonView>
				))}
		</TaskView>
	)
}

export default SingleTask

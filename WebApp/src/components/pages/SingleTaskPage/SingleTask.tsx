import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { ITask } from '../../../models/ITask'
import {
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from '../../../services/TasksService'
import { IUpdateTask } from '../../../services/interface/IUpdateTask'
import Message from '../../ui/HandlerMessage/HandlerMessage'
import styles from './SingleTask.module.scss'

const SingleTask: FC<{ data: ITask }> = ({ data }) => {
	var dateDeadline = new Date(data.deadline)

	const { idUser } = useAuth()

	const navigate = useNavigate()

	const [updateTaskMutation, { isSuccess, isError, error }] =
		useUpdateTaskMutation()

	const [deleteTaskMutation] = useDeleteTaskMutation()

	const completedTaskHandle = async () => {
		deleteTaskMutation(`${data.idTasks}`)
		navigate(-1)
	}

	const takeTaskHandle = async () => {
		const updateTask: IUpdateTask = {
			idUsers: idUser,
			deadline: data.deadline,
			description: data.description,
			idStatus: 2,
		}
		await updateTaskMutation({ id: `${data.idTasks}`, body: updateTask })
	}

	const backTaskHandle = async () => {
		const updateTask: IUpdateTask = {
			idUsers: null,
			deadline: data.deadline,
			description: data.description,
			idStatus: 1,
		}
		await updateTaskMutation({ id: `${data.idTasks}`, body: updateTask })
	}

	return (
		<div className={styles.wrapper}>
			<form>
				<div className={styles.title}>{data.title}</div>
				<div className={styles.description}>{data.description}</div>
				<div className={styles.date}>
					Дата сдачи: {dateDeadline.toISOString().split('T')[0]}
				</div>
				{idUser != data.idUser && (
					<div
						className={styles.updateBtn}
						onClick={() => {
							takeTaskHandle()
						}}
					>
						Взять задание
					</div>
				)}
				{idUser == data.idUser && (
					<div
						className={styles.updateBtn}
						onClick={() => {
							completedTaskHandle()
						}}
					>
						Задание выполнено
					</div>
				)}
				{idUser == data.idUser && (
					<div
						className={styles.updateBtn}
						onClick={() => {
							backTaskHandle()
						}}
					>
						Отказаться от задания
					</div>
				)}
				{isSuccess && <Message type='success' message='Успешно' />}
				{isError && (
					<Message
						type='error'
						message={
							error
								? 'status' in error
									? `${error.data}`
									: 'Неизвестная ошибка'
								: 'Неизвестная ошибка'
						}
					/>
				)}
			</form>
		</div>
	)
}

export default SingleTask

import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ITask } from '../../../models/ITask'
import { useGetStatusQuery } from '../../../services/StatusService'
import {
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} from '../../../services/TasksService'
import { useGetAllUsersQuery } from '../../../services/UserService'
import { IUpdateTask } from '../../../services/interface/IUpdateTask'
import CustomInput from '../../ui/CustomInput/CustomInput'
import { default as Message } from '../../ui/HandlerMessage/HandlerMessage'
import styles from './SingleTask.module.scss'

const SingleTaskUpdate: FC<{ data: ITask }> = ({ data }) => {
	const [deleteConfirmBtnIsVisible, setDeleteConfirmBtnIsVisible] =
		useState(false)
	const [successMessageIsVisible, setSuccessMessageIsVisible] = useState(false)

	const {
		register,
		formState: { errors, isDirty, defaultValues },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
		defaultValues: { ...data, idUser: data.idUser == null ? 0 : data.idUser },
	})

	console.log(defaultValues)
	const navigate = useNavigate()

	const [updateTaskMutation, { isSuccess, isError, error }] =
		useUpdateTaskMutation()
	const [deleteTaskMutation, { isSuccess: deleteIsSuccess }] =
		useDeleteTaskMutation()

	const { data: usersData } = useGetAllUsersQuery()
	const { data: statusData } = useGetStatusQuery()
	useEffect(() => {
		if (isSuccess) {
			setSuccessMessageIsVisible(true)
			setTimeout(() => {
				setSuccessMessageIsVisible(false)
			}, 5000)
		}
	}, [isSuccess])

	useEffect(() => {
		if (deleteIsSuccess) {
			navigate(-1)
		}
	}, [deleteIsSuccess])

	const deleteTaskHandle = async () => {
		await deleteTaskMutation(`${data.idTasks}`)
	}

	const onSubmit: SubmitHandler<ITask> = async data => {
		const updateTask: IUpdateTask = {
			idUsers: data.idUser == 0 ? null : data.idUser,
			deadline: data.deadline,
			description: data.description,
			idStatus: data.idStatus,
		}
		await updateTaskMutation({ id: `${data.idTasks}`, body: updateTask })
	}

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.title}>{data.title}</div>
				<div className={styles.description}>
					<textarea
						{...register('description', {
							maxLength: {
								value: 500,
								message: 'Максимальное количество символов 500',
							},
							required: {
								value: true,
								message: 'Поле обязательно',
							},
						})}
					/>
				</div>
				<div className={styles.row}>
					<div className={styles.date}>
						<CustomInput
							title='Дата сдачи'
							type='datetime-local'
							error={errors.deadline}
							register={register('deadline', {
								validate: (value, formData) =>
									value > formData.dateOfIssue ||
									'Дата сдачи меньше даты выдачи задания',
								required: { value: true, message: 'Дата обязательна' },
							})}
						/>
					</div>
					<div className={styles.status}>
						<span>Статус </span>
						<select {...register('idStatus')}>
							{statusData?.map(status => (
								<option key={status.idStatus} value={status.idStatus}>
									{status.name}
								</option>
							))}
						</select>
					</div>
					<div className={styles.user}>
						<span>Исполнитель </span>
						<select defaultValue={0} {...register('idUser')}>
							<option value={0}>Отсутствует</option>
							{usersData?.map(user => (
								<option key={user.idUser} value={`${user.idUser}`}>
									{user.login}
								</option>
							))}
						</select>
					</div>
				</div>

				{
					<button type='submit' className={styles.updateBtn}>
						Обновить
					</button>
				}
				{isDirty && (
					<div className={styles.updateBtn} onClick={() => reset()}>
						Сброс
					</div>
				)}
				{!deleteConfirmBtnIsVisible && (
					<div
						className={styles.deleteBtn}
						onClick={() => setDeleteConfirmBtnIsVisible(true)}
					>
						Удалить
					</div>
				)}
				{deleteConfirmBtnIsVisible && (
					<>
						<div
							className={styles.deleteBtn}
							onClick={() => deleteTaskHandle()}
						>
							Да
						</div>
						<div
							className={styles.updateBtn}
							onClick={() => setDeleteConfirmBtnIsVisible(false)}
						>
							Нет
						</div>
					</>
				)}
				{successMessageIsVisible && (
					<Message type='success' message='Успешно' />
				)}
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

export default SingleTaskUpdate

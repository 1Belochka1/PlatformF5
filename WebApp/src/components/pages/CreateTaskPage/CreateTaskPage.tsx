import { FC } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateTaskMutation } from '../../../services/TasksService'
import { useGetAllUsersQuery } from '../../../services/UserService'
import { ICreateTask } from '../../../services/interface/ICreateTask'
import Layout from '../../common/Layout'
import CustomInput from '../../ui/CustomInput/CustomInput'
import Message from '../../ui/HandlerMessage/HandlerMessage'
import styles from './CreateTaskPage.module.scss'

const CreateTaskPage: FC = () => {
	const { data: usersData } = useGetAllUsersQuery()
	const [createTask, { isSuccess, isError, error }] = useCreateTaskMutation()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			title: '',
			description: '',
			deadline: new Date(),
			idUser: null,
		},
	})

	const onSubmit: SubmitHandler<ICreateTask> = async data => {
		await createTask({
			idUser: data.idUser == 0 ? null : data.idUser,
			deadline: data.deadline,
			description: data.description,
			title: data.title,
		})
	}

	return (
		<Layout headerIsVisible>
			<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.title}>
					<CustomInput
						title='Название'
						type='text'
						error={errors.title}
						register={register('title', {
							required: 'Поле обязательно для заполнения',
							minLength: {
								value: 6,
								message: 'Минимум 6 символов',
							},
							maxLength: {
								value: 50,
								message: 'Максимум 50 символов',
							},
						})}
					/>
				</div>
				<div className={styles.description}>
					<textarea
						placeholder='Описание'
						{...register('description', {
							maxLength: {
								value: 500,
								message: 'Максимальное количество символов 500',
							},
							required: 'Поле обязательно для заполнения',
						})}
					/>
					{errors.description?.message && (
						<Message type='error' message={errors.description.message} />
					)}
				</div>
				<div className={styles.deadline}>
					<CustomInput
						title='Дата сдачи'
						type='datetime-local'
						error={errors.deadline}
						register={register('deadline', {
							validate: value =>
								new Date(value) > new Date() ||
								'Дата сдачи не может быть меньше текущей даты',
							required: { value: true, message: 'Дата обязательна' },
						})}
					/>
				</div>
				<div className={styles.idUser}>
					<span>Исполнитель </span>
					<select {...register('idUser')}>
						<option value={0}>Отсутствует</option>
						{usersData
							?.filter(user => user.idRole > 2)
							.map(user => (
								<option key={user.idUser} value={`${user.idUser}`}>
									{user.login}
								</option>
							))}
					</select>
				</div>
				<button className={styles.createTask}>Создать задание</button>
				{isSuccess && <Message message='Задание создано' type='success' />}
				{isError && (
					<Message
						message={
							error
								? 'status' in error
									? `${error.data}`
									: 'Неизвестная ошибка'
								: 'Неизвестная ошибка'
						}
						type='error'
					/>
				)}
			</form>
		</Layout>
	)
}

export default CreateTaskPage

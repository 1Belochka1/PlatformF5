import { FC, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateUserMutation } from '../../../services/AuthService'
import { ICreateUser } from '../../../services/interface/ICreateUser'
import Layout from '../../common/Layout'
import CustomInput from '../../ui/CustomInput/CustomInput'
import Message from '../../ui/HandlerMessage/HandlerMessage'
import styles from './CreateUserPage.module.scss'

const CreateUserPage: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			user: { login: '', idRole: 3, password: '' },
			userInfo: {
				name: '',
				email: '',
				patronymic: '',
				phone: '',
				surname: '',
			},
		},
	})

	const [createUser, { isSuccess, isError, error }] = useCreateUserMutation()

	const onSubmit: SubmitHandler<ICreateUser> = async data => {
		await createUser(data)
	}

	useEffect(() => {
		if (isSuccess) {
			reset()
		}
	}, [isSuccess])

	return (
		<Layout headerIsVisible>
			<div className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.login}>
						<CustomInput
							title='Логин'
							type='text'
							register={register('user.login', {
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
							error={errors?.user?.login}
						/>
					</div>
					<div className={styles.password}>
						<CustomInput
							title='Пароль'
							type='text'
							register={register('user.password', {
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
							error={errors?.user?.password}
						/>
					</div>
					<div className={styles.idRole}>
						<span>Роль</span>
						<select {...register('user.idRole')}>
							<option value='1'>Админ</option>
							<option value='2'>Менеджер</option>
							<option value='3'>Исполнитель</option>
						</select>
					</div>
					<div className={styles.surname}>
						<CustomInput
							title='Фамилия'
							type='text'
							register={register('userInfo.surname', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 1,
									message: 'Минимум 1 символов',
								},
								maxLength: {
									value: 50,
									message: 'Максимум 50 символов',
								},
							})}
							error={errors?.userInfo?.surname}
						/>
					</div>
					<div className={styles.name}>
						<CustomInput
							title='Имя'
							type='text'
							register={register('userInfo.name', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 1,
									message: 'Минимум 1 символов',
								},
								maxLength: {
									value: 50,
									message: 'Максимум 50 символов',
								},
							})}
							error={errors?.userInfo?.name}
						/>
					</div>
					<div className={styles.patronymic}>
						<CustomInput
							title='Отчество'
							type='text'
							register={register('userInfo.patronymic', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 1,
									message: 'Минимум 1 символов',
								},
								maxLength: {
									value: 50,
									message: 'Максимум 50 символов',
								},
							})}
							error={errors?.userInfo?.patronymic}
						/>
					</div>
					<div className={styles.email}>
						<CustomInput
							title='Почта'
							type='email'
							register={register('userInfo.email', {
								required: 'Поле обязательно для заполнения',
								maxLength: {
									value: 50,
									message: 'Максимум 50 символов',
								},
								pattern: {
									value: new RegExp(
										'([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})'
									),
									message: 'Почта указана не верно',
								},
							})}
							error={errors?.userInfo?.email}
						/>
					</div>
					<div className={styles.phone}>
						<CustomInput
							title='Номер телефона'
							type='tel'
							register={register('userInfo.phone', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value: new RegExp('8[0-9]{3}[0-9]{3}[0-9]{4}'),
									message: 'Не соответствует примеру',
								},
							})}
							error={errors?.userInfo?.phone}
						/>
					</div>
					<div>Пример: 89998887777</div>
					<div className={styles.submit}>
						<input type='submit' value={'Создать пользователя'}></input>
					</div>
					{isSuccess && (
						<Message message='Пользователь создан' type='success' />
					)}
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
			</div>
		</Layout>
	)
}

export default CreateUserPage

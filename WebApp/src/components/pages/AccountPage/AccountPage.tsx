import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	useGetUserByJwtAuthQuery,
	useUpdatePasswordUserMutation,
} from '../../../services/UserService'
import { IUpdatePasswordUser } from '../../../services/interface/IUpdatePasswordUser'
import Layout from '../../common/Layout'
import CustomInput from '../../ui/CustomInput/CustomInput'
import Message from '../../ui/HandlerMessage/HandlerMessage'
import styles from './AccountPage.module.scss'

// @ts-ignore
const AccountPage: FC = () => {
	const [changePasswordIsVisible, setChangePasswordIsVisible] = useState(false)
	const { data: userData, isError, error } = useGetUserByJwtAuthQuery()
	const [
		updatePassword,
		{ isSuccess, isError: updatePasswordIsError, error: updatePasswordError },
	] = useUpdatePasswordUserMutation()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			oldPassword: '',
			newPassword: '',
		},
	})

	if (userData) {
		const onSubmit: SubmitHandler<IUpdatePasswordUser> = async data => {
			await updatePassword({ id: userData.idUser, body: data })
		}
		return (
			<Layout headerIsVisible >
				<div className={styles.wrapper}>
					<div className={styles.login}>
						<span>Логин: </span>
						{userData.login}
					</div>
					<div className={styles.surname}>
						<span>Фамилия: </span>
						{userData.userInfo.surname}
					</div>
					<div className={styles.name}>
						<span>Имя: </span>
						{userData.userInfo.name}
					</div>
					<div className={styles.patronymic}>
						<span>Отчество: </span>
						{userData.userInfo.patronymic}
					</div>
					<div className={styles.email}>
						<span>Почта: </span>
						{userData.userInfo.email}
					</div>
					<div className={styles.phone}>
						<span>Номер телефона: </span>
						{userData.userInfo.phone}
					</div>
					<div className={styles.updatePassword}>
						<div
							onClick={() => {
								setChangePasswordIsVisible(prev => !prev)
							}}
						>
							Изменить пароль
						</div>
						{changePasswordIsVisible && (
							<form onSubmit={handleSubmit(onSubmit)}>
								<CustomInput
									title='Старый пароль'
									error={errors.oldPassword}
									type='text'
									register={register('oldPassword', {
										required: 'Поле обязательно для заполнения',
										minLength: {
											value: 6,
											message: 'Минимум 6 символов',
										},
										maxLength: {
											value: 45,
											message: 'Максимум 45 символов',
										},
									})}
								/>
								<CustomInput
									title='Новый пароль'
									error={errors.newPassword}
									type='text'
									register={register('newPassword', {
										required: 'Поле обязательно для заполнения',
										minLength: {
											value: 6,
											message: 'Минимум 6 символов',
										},
										maxLength: {
											value: 45,
											message: 'Максимум 45 символов',
										},
									})}
								/>
								<input type='submit' value={'Подтвердить'} />
								{isSuccess && (
									<Message message='Пароль обновлен' type='success' />
								)}
								{updatePasswordIsError && (
									<Message
										message={
											updatePasswordError
												? 'status' in updatePasswordError
													? `${updatePasswordError.data}`
													: 'Неизвестная ошибка'
												: 'Неизвестная ошибка'
										}
										type='error'
									/>
								)}
							</form>
						)}
					</div>
				</div>
			</Layout>
		)
	} else if (isError) {
		if (error && 'status' in error) {
			return <Message message={`${error.data}`} type='error' />
		}
	}
	else {
		<Message message="Ошибка" type='error' />
	}
}

export default AccountPage

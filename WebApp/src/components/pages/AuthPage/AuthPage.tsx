import { FC, useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { IAuthUser, useLoginUserMutation } from '../../../services/AuthService'
import { setUser } from '../../../store/reducers/authSlice'
import Layout from '../../common/Layout'
import CustomInput from '../../ui/CustomInput/CustomInput'
import Message from '../../ui/HandlerMessage/HandlerMessage'
import styles from './AuthPage.module.scss'

const AuthPage: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onSubmit',
		defaultValues: {
			login: '',
			password: '',
		},
	})

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const [loginUser, { data, isSuccess, isError, error }] =
		useLoginUserMutation()

	const onSubmit: SubmitHandler<IAuthUser> = async data => {
		await loginUser(data)
	}
	useEffect(() => {
		if (isSuccess && data) {
			dispatch(
				setUser({
					login: data.login,
					idUser: data.idUser,
					idRole: data.idRole,
					token: data.token,
				})
			)
			navigate('/tasks')
		}
	}, [isSuccess])

	return (
		<Layout headerIsVisible={false}>
			<div className={styles.wrapper}>
				<div className={styles.auth}>
					<div className={styles.title}>Авторизация</div>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<CustomInput
							title='Введите логин:'
							type='text'
							register={register('login', {
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
							error={errors?.login}
						/>
						<CustomInput
							title='Введите пароль:'
							type='password'
							register={register('password', {
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
							error={errors?.password}
						/>
						<button type='submit' className={styles.logInBtn}>
							Войти
						</button>
						{isError && error ? (
							'status' in error ? (
								<Message message={`${error.data}`} type='error' />
							) : null
						) : null}
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default AuthPage

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useEffect, useState } from 'react'
import { Button, Text } from 'react-native'
import { useAppDispatch } from '../../../hooks/redux'
import { useLoginUserMutation } from '../../../services/AuthService'
import { setUser } from '../../../store/reducers/authSlice'
import { RootStackParamList } from '../../navigation/Navigation'
import { Container, CustomInput, TextNormal } from './styled'

const Auth: FC<NativeStackScreenProps<RootStackParamList, 'Auth'>> = ({
	navigation,
}) => {
	const [loginState, setLoginState] = useState('')
	const [passwordState, setPasswordState] = useState('')
	const [login, { data, isSuccess, isError, error }] = useLoginUserMutation()

	const dispatch = useAppDispatch()
	const logIn = () => {
		login({ login: loginState, password: passwordState })
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
		}
	}, [isSuccess])

	return (
		<Container>
			<TextNormal>Введите логин</TextNormal>
			<CustomInput
				value={loginState}
				onChangeText={setLoginState}
				placeholder='Логин'
			/>
			<TextNormal>Введите пароль</TextNormal>
			<CustomInput
				value={passwordState}
				onChangeText={setPasswordState}
				placeholder='Пароль'
			/>
			<Button title='Войти' onPress={logIn} />
			{isError && <Text>Ошибка</Text>}
		</Container>
	)
}

export default Auth

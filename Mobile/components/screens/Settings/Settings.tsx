import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useAppDispatch } from '../../../hooks/redux'
import { logOut } from '../../../store/reducers/authSlice'

const Settings: FC = () => {
	const dispatch = useAppDispatch()

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Pressable
				style={{
					padding: 10,
					backgroundColor: 'rgb(82, 149, 204)',
					width: 200,
					borderRadius: 5,
				}}
				onPress={() => {
					dispatch(logOut())
				}}
			>
				<Text style={{ color: 'white' }}>Выйти из аккаунта</Text>
			</Pressable>
		</View>
	)
}

export default Settings

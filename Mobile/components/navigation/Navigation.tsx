import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Auth from '../screens/Auth/Auth'
import Settings from '../screens/Settings/Settings'
import ButtonHeader from './ButtonHeader'
import HomeStack from './HomeStack'

export type RootStackParamList = {
	Auth: undefined
	Tasks: undefined
	Settings: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation: FC = () => {
	const { isAuth } = useAuth()

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!isAuth ? (
					<Stack.Screen
						name='Auth'
						component={Auth}
						options={{ title: 'Авторизация' }}
					/>
				) : (
					<>
						<Stack.Screen
							name='Tasks'
							component={HomeStack}
							options={({ navigation }) => ({
								title: 'Задания',
								headerRight: ({}) => <ButtonHeader navigation={navigation} />,
							})}
						/>
						<Stack.Screen
							name='Settings'
							component={Settings}
							options={({ navigation }) => ({
								title: 'Настройки',
							})}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FC } from 'react'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import AllTasks from '../screens/Tasks/AllTasks'
import UserTasks from '../screens/Tasks/UserTasks'

const Tab = createBottomTabNavigator()

const HomeStack: FC = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: '#5295CC',
				tabBarInactiveTintColor: 'gray',
				headerShown: false,
				tabBarLabelStyle: { fontSize: 14 },
			}}
		>
			<Tab.Screen
				name='AllTasks'
				component={AllTasks}
				options={{
					title: 'Все задания',
					tabBarIcon: ({ color }) => (
						<Material name='format-list-bulleted' color={color} size={20} />
					),
				}}
			/>
			<Tab.Screen
				name='UserTasks'
				component={UserTasks}
				options={{
					title: 'Текущие задания',
					tabBarIcon: ({ color }) => (
						<Material name='clipboard-list' color={color} size={20} />
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default HomeStack

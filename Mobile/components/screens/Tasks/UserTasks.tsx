import React, { FC } from 'react'
import { View } from 'react-native'
import { useGetAllTasksByUserIdQuery } from '../../../services/TasksService'
import ListTasks from './ListTasks'

const UserTasks: FC = () => {
	const { data, isLoading, isError, error, refetch } =
		useGetAllTasksByUserIdQuery()

	return (
		<View>
			<ListTasks
				data={data}
				isLoading={isLoading}
				error={error}
				isError={isError}
				refetch={refetch}
				allTasks={false}
			/>
		</View>
	)
}

export default UserTasks

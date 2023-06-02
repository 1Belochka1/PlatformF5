import React, { FC } from 'react'
import { View } from 'react-native'
import { useGetTasksNoUsersQuery } from '../../../services/TasksService'
import ListTasks from './ListTasks'

const AllTasks: FC = () => {
	const { data, isLoading, isError, error, refetch } = useGetTasksNoUsersQuery()

	return (
		<View>
			<ListTasks
				data={data}
				isLoading={isLoading}
				error={error}
				isError={isError}
				refetch={refetch}
				allTasks={true}
			/>
		</View>
	)
}

export default AllTasks

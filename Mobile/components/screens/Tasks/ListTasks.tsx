import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import React, { FC } from 'react'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from 'react-native'
import { ITask } from '../../../models/ITask'
import SingleTask from './SingleTask'

interface IListTasks {
	data: ITask[] | undefined
	isLoading: boolean
	isError: boolean
	error: FetchBaseQueryError | SerializedError | undefined
	refetch: () => any
	allTasks: boolean
}

const ListTasks: FC<IListTasks> = ({
	data,
	isLoading,
	isError,
	error,
	refetch,
	allTasks,
}) => {
	return (
		<View>
			{isLoading ? (
				<View>
					<ActivityIndicator size='large' />
				</View>
			) : data ? (
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => refetch()}
						/>
					}
					ListEmptyComponent={
						<Text style={{ textAlign: 'center', fontSize: 20 }}>
							Заданий нет
						</Text>
					}
					data={data}
					renderItem={({ item }) => (
						<SingleTask allTasks={allTasks} task={item} />
					)}
				/>
			) : (
				isError &&
				error &&
				'status' in error && (
					<Text>{`${error.data}`}</Text>
					// <HandlerMessage message={`${error.data}`} type='error' />
				)
			)}
		</View>
	)
}

export default ListTasks

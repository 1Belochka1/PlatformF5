import { ResultDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import {
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react'
import { ITask } from '../models/ITask'
import { RootState } from '../store/store'
import { baseUrl } from './apiSettings'
import { ICreateTask } from './interface/ICreateTask'
import { IUpdateTask } from './interface/IUpdateTask'


export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	tagTypes: ['tasks'],
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'Tasks',
		prepareHeaders: (headers: Headers, { getState }) => {
			const token = (getState() as RootState).auth.token

			if (token) {
				headers.set('Authorization', `bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		getAllTasks: builder.query<ITask[], void>({
			query: () => '',
			providesTags: result =>
				result
					? [
							...result.map(({ idTasks }) => ({
								type: 'tasks' as const,
								idTasks,
							})),
							{ type: 'tasks', id: 'LIST' },
					  ]
					: [{ type: 'tasks', id: 'LIST' }],
		}),
		getAllTasksByUserId: builder.query<ITask[], void>({
			query: () => '/GetAllTasksByJwtAuth',
			providesTags: result =>
				result
					? [
							...result.map(({ idTasks }) => ({
								type: 'tasks' as const,
								idTasks,
							})),
							{ type: 'tasks', id: 'LIST' },
					  ]
					: [{ type: 'tasks', id: 'LIST' }],
		}),
		getTasksNoUsers: builder.query<ITask[], void>({
			query: () => '/GetTasksNoUsers',
			providesTags: result =>
				result
					? [
							...result.map(({ idTasks }) => ({
								type: 'tasks' as const,
								idTasks,
							})),
							{ type: 'tasks', id: 'LIST' },
					  ]
					: [{ type: 'tasks', id: 'LIST' }],
		}),
		GetTasksCompletedByUserId: builder.query<ITask[], void>({
			query: () => '/GetTasksCompletedByUserId',
			providesTags: result =>
				result
					? [
							...result.map(({ idTasks }) => ({
								type: 'tasks' as const,
								idTasks,
							})),
							{ type: 'tasks', id: 'LIST' },
					  ]
					: [{ type: 'tasks', id: 'LIST' }],
		}),
		getTaskById: builder.query<ITask, string>({
			query: (id: string) => `/GetTaskById/${id}`,
			providesTags: [{ type: 'tasks', id: 'LIST' }],
		}),
		createTask: builder.mutation<ITask, ICreateTask>({
			query: body => {
				return { url: '', method: 'post', body }
			},
			invalidatesTags: [{ type: 'tasks', id: 'LIST' }],
		}),
		updateTask: builder.mutation<ITask, { id: string; body: IUpdateTask }>({
			query: ({ id, body }) => {
				return { url: `/${id}`, method: 'put', body }
			},
			invalidatesTags: [
				{ type: 'tasks', id: 'LIST' },
				{ type: 'tasks', id: 'one' },
			],
		}),
		deleteTask: builder.mutation<ITask, string>({
			query: id => {
				return { url: `/${id}`, method: 'delete' }
			},
			invalidatesTags: [{ type: 'tasks', id: 'LIST' }],
		}),
	}),
})

export const {
	useCreateTaskMutation,
	useGetAllTasksQuery,
	useDeleteTaskMutation,
	useGetAllTasksByUserIdQuery,
	useGetTaskByIdQuery,
	useUpdateTaskMutation,
	useGetTasksNoUsersQuery,
	useGetTasksCompletedByUserIdQuery,
} = tasksApi

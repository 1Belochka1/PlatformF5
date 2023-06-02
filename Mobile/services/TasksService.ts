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
import { IUpdateTask } from './interface/IUpdateTask'

const providesTags:
	| ResultDescription<
			'tasks',
			ITask[],
			void,
			FetchBaseQueryError,
			FetchBaseQueryMeta | undefined
	  >
	| undefined = result =>
	result
		? [
				...result.map(({ idTasks }) => ({
					type: 'tasks' as const,
					idTasks,
				})),
				{ type: 'tasks', id: 'LIST' },
		  ]
		: [{ type: 'tasks', id: 'LIST' }]

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
		getAllTasksByUserId: builder.query<ITask[], void>({
			query: () => '/GetAllTasksByJwtAuth',
			providesTags: providesTags,
		}),
		getTasksNoUsers: builder.query<ITask[], void>({
			query: () => '/GetTasksNoUsers',
			providesTags: providesTags,
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
	useGetAllTasksByUserIdQuery,
	useGetTasksNoUsersQuery,
	useDeleteTaskMutation,
	useUpdateTaskMutation,
} = tasksApi

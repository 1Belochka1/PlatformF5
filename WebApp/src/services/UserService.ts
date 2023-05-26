import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUser } from '../models/IUser'
import { RootState } from '../store/store'
import { baseUrl } from './apiSettings'
import { IUpdatePasswordUser } from './interface/IUpdatePasswordUser'
import { IUpdateUser } from './interface/IUpdateUser'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	tagTypes: ['users'],
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'Users',
		prepareHeaders: (headers: Headers, { getState }) => {
			const token = (getState() as RootState).auth.token

			if (token) {
				headers.set('Authorization', `bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: builder => ({
		getAllUsers: builder.query<IUser[], void>({
			query: () => '',
			providesTags: result =>
				result
					? [
							...result.map(({ idUser }) => ({
								type: 'users' as const,
								idUser,
							})),
							{ type: 'users', id: 'LIST' },
					  ]
					: [{ type: 'users', id: 'LIST' }],
		}),
		getUserByJwtAuth: builder.query<IUser, void>({
			query: () => '/GetUserByJwtAuth',
			providesTags: [{ type: 'users', id: 'one' }],
		}),
		updateUser: builder.mutation<IUser, { id: string; body: IUpdateUser }>({
			query: ({ id, body }) => {
				return { url: `/${id}`, method: 'put', body }
			},
			invalidatesTags: [
				{ type: 'users', id: 'LIST' },
				{ type: 'users', id: 'one' },
			],
		}),
		updatePasswordUser: builder.mutation<
			IUser,
			{ id: number; body: IUpdatePasswordUser }
		>({
			query: ({ id, body }) => {
				return { url: `/UpdatePasswordUser/${id}`, method: 'put', body }
			},
			invalidatesTags: [
				{ type: 'users', id: 'LIST' },
				{ type: 'users', id: 'one' },
			],
		}),
		deleteUser: builder.mutation<IUser, string>({
			query: id => {
				return { url: `/${id}`, method: 'delete' }
			},
			invalidatesTags: [
				{ type: 'users', id: 'LIST' },
				{ type: 'users', id: 'one' },
			],
		}),
	}),
})

export const {
	useGetAllUsersQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetUserByJwtAuthQuery,
	useUpdatePasswordUserMutation,
} = usersApi

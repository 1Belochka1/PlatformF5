import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUser } from '../models/IUser'
import { IUserState } from '../store/reducers/authSlice'
import { RootState } from '../store/store'
import { baseUrl } from './apiSettings'
import { ICreateUser } from './interface/ICreateUser'

export interface IAuthUser {
	login: string
	password: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'Auth',
		prepareHeaders: (headers: Headers, { getState }) => {
			const token = (getState() as RootState).auth.token

			if (token) {
				headers.set('Authorization', `bearer ${token}`)
			}
			return headers
		},
	}),

	endpoints: builder => ({
		loginUser: builder.mutation<IUserState, IAuthUser>({
			query: body => {
				return { url: '/Login', method: 'post', body }
			},
		}),
		createUser: builder.mutation<IUser, ICreateUser>({
			query: body => {
				return { url: '/Register', method: 'post', body }
			},
		}),
	}),
})

export const { useLoginUserMutation, useCreateUserMutation } = authApi

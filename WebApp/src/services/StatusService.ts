import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/store'
import { baseUrl } from './apiSettings'

export interface IStatus {
	idStatus: number
	name: string
}

export const statusApi = createApi({
	reducerPath: 'statusApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl + 'Status',
		prepareHeaders: (headers: Headers, { getState }) => {
			const token = (getState() as RootState).auth.token

			if (token) {
				headers.set('Authorization', `bearer ${token}`)
			}
			return headers
		},
	}),

	endpoints: builder => ({
		getStatus: builder.query<IStatus[], void>({
			query: () => {
				return { url: '/', method: 'get' }
			},
		}),
	}),
})

export const { useGetStatusQuery } = statusApi

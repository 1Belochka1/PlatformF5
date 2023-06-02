import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'

import { authApi } from '../services/AuthService'
import { tasksApi } from '../services/TasksService'

import { statusApi } from '../services/StatusService'
import authReducer from './reducers/authSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	[authApi.reducerPath]: authApi.reducer,
	[tasksApi.reducerPath]: tasksApi.reducer,
	[statusApi.reducerPath]: statusApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(tasksApi.middleware)
			.concat(statusApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

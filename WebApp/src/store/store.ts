import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authApi } from '../services/AuthService'
import { statusApi } from '../services/StatusService'
import { tasksApi } from '../services/TasksService'
import { usersApi } from '../services/UserService'
import authReducer from './reducers/authSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	[authApi.reducerPath]: authApi.reducer,
	[tasksApi.reducerPath]: tasksApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[statusApi.reducerPath]: statusApi.reducer,
})

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(authApi.middleware)
			.concat(tasksApi.middleware)
			.concat(usersApi.middleware)
			.concat(statusApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IUserState {
	login: string | null
	idUser: number | null
	idRole: number | null
	token: string | null
}

const initialState: IUserState = {
	login: null,
	idUser: null,
	idRole: null,
	token: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserState>) => {
			state.login = action.payload.login
			state.idUser = action.payload.idUser
			state.idRole = action.payload.idRole
			state.token = action.payload.token
		},
		logOut: state => {
			state.login = null
			state.idUser = null
			state.idRole = null
			state.token = null
		},
	},
})

export const selectAuth = (state: RootState) => state.auth

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer

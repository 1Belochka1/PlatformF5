import { useAppSelector } from './redux'

export const useAuth = () => {
	const { login, idUser, idRole, token } = useAppSelector(state => state.auth)

	return {
		isAuth: !!login,
		login,
		idUser,
		idRole,
		token,
	}
}

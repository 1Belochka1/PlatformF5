export interface ICreateUser {
	user: { login: string; password: string; idRole: number }
	userInfo: {
		surname: string
		name: string
		patronymic: string
		email: string
		phone: string
	}
}

export interface IUser {
	login: string
	idUser: number
	idRole: number
	userInfo: {
		surname: string
		name: string
		patronymic: string
		email: string
		phone: string
	}
}

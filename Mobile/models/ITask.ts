export interface ITask {
	idTasks: number
	title: string
	description: string
	dateOfIssue: Date
	deadline: Date
	idStatus: number
	idUser: number | null
}

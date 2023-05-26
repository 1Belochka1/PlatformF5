interface IDataMenu {
	link: string
	title: string
	access: number
}

export const dataMenu: IDataMenu[] = [
	{
		link: '/tasks',
		title: 'Задания',
		access: 3,
	},
	{
		link: '/account',
		title: 'Личный кабинет',
		access: 3,
	},
	{
		link: '/createTask',
		title: 'Создать задание',
		access: 2,
	},
	{
		link: '/users',
		title: 'Пользователи',
		access: 1,
	},
	{
		link: '/createUser',
		title: 'Создать пользователя',
		access: 1,
	},
]

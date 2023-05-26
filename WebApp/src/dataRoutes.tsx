import AccountPage from './components/pages/AccountPage/AccountPage'
import AuthPage from './components/pages/AuthPage/AuthPage'
import CreateTaskPage from './components/pages/CreateTaskPage/CreateTaskPage'
import CreateUserPage from './components/pages/CreateUserPage/CreateUserPage'
import SingleTaskPage from './components/pages/SingleTaskPage/SingleTaskPage'
import TasksPage from './components/pages/TasksPage/TasksPage'
import UsersPage from './components/pages/UsersPage/UsersPage'

interface IDataRoutes {
	path: string
	exact: boolean
	component: any
	auth: boolean
	access: number | null
}

export const dataRoutes: IDataRoutes[] = [
	{
		path: 'auth',
		exact: false,
		component: AuthPage,
		auth: false,
		access: null,
	},
	{
		path: 'tasks',
		exact: false,
		component: TasksPage,
		auth: true,
		access: 3,
	},
	{
		path: 'task/:id',
		exact: false,
		component: SingleTaskPage,
		auth: true,
		access: 3,
	},
	{
		path: 'users',
		exact: false,
		component: UsersPage,
		auth: true,
		access: 1,
	},
	{
		path: 'createTask',
		exact: false,
		component: CreateTaskPage,
		auth: true,
		access: 2,
	},
	{
		path: 'createUser',
		exact: false,
		component: CreateUserPage,
		auth: true,
		access: 1,
	},
	{
		path: 'account',
		exact: false,
		component: AccountPage,
		auth: true,
		access: 3,
	},
]

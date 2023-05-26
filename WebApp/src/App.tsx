import { Navigate, Route, Routes } from 'react-router-dom'
import { dataRoutes } from './dataRoutes'
import { useAuth } from './hooks/useAuth'
import './scss/App.scss'

function App() {
	const { isAuth, idRole } = useAuth()

	return (
		<Routes>
			{dataRoutes.map(route => {
				if ((route.auth && !isAuth) || (!route.auth && isAuth)) {
					return false
				}
				if (idRole) {
					if (route.access) {
						if (idRole - 1 > route.access) {
							return false
						}
					}
				}
				return (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				)
			})}
			<Route
				path='*'
				element={<Navigate to={isAuth ? '/tasks' : '/auth'} replace />}
			/>
		</Routes>
	)
}

export default App

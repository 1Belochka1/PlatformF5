import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks/redux'
import { useAuth } from '../../../hooks/useAuth'
import { logOut } from '../../../store/reducers/authSlice'
import styles from './Header.module.scss'
import { dataMenu } from './dataMenu'

const Header: FC = () => {
	const { idRole } = useAuth()
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const logOutHandle = () => {
		dispatch(logOut())
		navigate('/auth')
	}

	return (
		<div className={styles.header}>
			{dataMenu.map(menuItem => {
				if (idRole == null) {
				} else if (idRole <= menuItem.access) {
					return (
						<li key={`link ${menuItem.link}`}>
							<Link to={menuItem.link}>{menuItem.title}</Link>
						</li>
					)
				}
			})}
			<li className={styles.logOut} onClick={() => logOutHandle()}>
				Выйти из аккаунта
			</li>
		</div>
	)
}

export default Header

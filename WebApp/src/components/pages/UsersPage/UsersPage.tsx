import { FC } from 'react'
import Layout from '../../common/Layout'

import { useGetAllUsersQuery } from '../../../services/UserService'
import UserItem from './UserItem'
import styles from './UsersPage.module.scss'

const UsersPage: FC = () => {
	const { data, isError, error } = useGetAllUsersQuery()

	if (data) {
		return (
			<Layout headerIsVisible>
				<div className={styles.wrapper}>
					{data.map(user => (
						<UserItem
							idUser={`${user.idUser}`}
							key={user.idUser}
							login={user.login}
							userInfo={user.userInfo}
						/>
					))}
				</div>
			</Layout>
		)
	} else if (isError) {
		if (error) {
			if ('status' in error) {
				return (
					<Layout
						headerIsVisible
					>{`${error.data}`}</Layout>
				)
			}
		}
	}
}

export default UsersPage

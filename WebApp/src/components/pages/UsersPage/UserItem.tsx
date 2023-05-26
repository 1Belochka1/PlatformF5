import { FC, useEffect, useState } from 'react'

import { useAuth } from '../../../hooks/useAuth'
import { useDeleteUserMutation } from '../../../services/UserService'
import styles from './UserItem.module.scss'

interface IUserItem {
	idUser: string
	login: string
	userInfo: {
		surname: string
		name: string
		patronymic: string
		email: string
		phone: string
	}
}

const UserItem: FC<IUserItem> = ({ userInfo, login, idUser }) => {
	const [deleteConfirmBtnIsVisible, setDeleteConfirmBtnIsVisible] =
		useState<boolean>(false)
	const [deleteBtnIsVisible, setDeleteBtnIsVisible] = useState<boolean>(true)

	const { idUser: authIdUser } = useAuth()

	useEffect(() => {
		if (authIdUser) {
			if (`${authIdUser}` == idUser) {
				setDeleteBtnIsVisible(false)
			}
		}
	}, [])

	const [deleteUser] = useDeleteUserMutation()

	const deleteTaskHandle = async () => {
		await deleteUser(idUser)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Логин: {login}</div>
			<div>Фамилия: {userInfo.surname}</div>
			<div>Имя: {userInfo.name}</div>
			<div>Отчество: {userInfo.patronymic}</div>
			<div>Почта: {userInfo.email}</div>
			<div>Номер телефона: {userInfo.phone}</div>
			{!deleteConfirmBtnIsVisible && deleteBtnIsVisible && (
				<div
					className={styles.deleteBtn}
					onClick={() => setDeleteConfirmBtnIsVisible(true)}
				>
					Удалить
				</div>
			)}
			{deleteConfirmBtnIsVisible && (
				<>
					<div className={styles.deleteBtn} onClick={() => deleteTaskHandle()}>
						Да
					</div>
					<div
						className={styles.noBtn}
						onClick={() => setDeleteConfirmBtnIsVisible(false)}
					>
						Нет
					</div>
				</>
			)}
		</div>
	)
}

export default UserItem

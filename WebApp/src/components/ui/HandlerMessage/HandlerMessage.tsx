import classNames from 'classnames'
import { FC } from 'react'
import styles from './HandlerMessage.module.scss'
interface IError {
	message?: string
	type: 'success' | 'error' | 'message' | 'loading'
}

const Message: FC<IError> = ({ message = undefined, type }) => {
	return (
		<div className={styles.wrapper}>
			<div
				className={classNames(styles.general, {
					[styles.success]: type == 'success',
					[styles.error]: type == 'error',
					[styles.message]: type == 'message',
					[styles.loading]: type == 'loading',
				})}
			>
				{type != 'loading' ? message : 'Загрузка'}
			</div>
		</div>
	)
}

export default Message

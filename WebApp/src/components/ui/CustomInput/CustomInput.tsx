import { FC } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import Message from '../HandlerMessage/HandlerMessage'
import styles from './CustomInput.module.scss'

interface ICustomInput {
	title: string
	type: React.HTMLInputTypeAttribute
	error: FieldError | undefined
	register: UseFormRegisterReturn
}

const CustomInput: FC<ICustomInput> = ({ title, type, error, register }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<span>{title}</span>
				<input type={type} {...register} />
				{error?.message && <Message type='error' message={error.message} />}
			</div>
		</>
	)
}

export default CustomInput

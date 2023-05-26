import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useGetTaskByIdQuery } from '../../../services/TasksService'
import Layout from '../../common/Layout'
import SingleTask from './SingleTask'
import SingleTaskUpdate from './SingleTaskUpdate'

const SingleTaskPage: FC = () => {
	const { id } = useParams()
	const { idRole } = useAuth()

	if (id) {
		const { data, isLoading, isError } = useGetTaskByIdQuery(id)

		if (data) {
			return (
				<Layout headerIsVisible>
					{idRole != null && idRole <= 2 ? (
						<SingleTaskUpdate data={data} />
					) : (
						<SingleTask data={data} />
					)}
				</Layout>
			)
		} else if (isLoading) {
			return <Layout headerIsVisible>Загрузка</Layout>
		} else if (isError) {
			return (
				<Layout headerIsVisible>
					<div>Задание не найдено</div>
				</Layout>
			)
		}
	} else {
		return (
			<Layout headerIsVisible>
				<div className='bg-red-500'>Произошла ошибка</div>
			</Layout>
		)
	}
}

export default SingleTaskPage

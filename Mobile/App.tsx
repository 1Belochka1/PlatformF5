import { Provider } from 'react-redux'
import Navigation from './components/navigation/Navigation'
import { store } from './store/store'

export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	)
}

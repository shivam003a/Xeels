import './App.css'
import { Routes, Route } from 'react-router-dom'
import Xeels from './components/Xeels'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Upload from './components/Upload'
import Navigate from './components/Navigate'
import Dummy from './components/Dummy'

function App() {

	return (
		<div className='w-full sm:w-full md:w-full lg:w-[350px] mx-auto overflow-hidden border'>
			<Dummy />
			<Routes>
				<Route index element={<Signup />} />
				<Route path={'/signin'} element={<Signin />} />
				<Route path={'/signup'} element={<Signup />} />
				<Route path={'/upload'} element={<Upload />} />
				<Route path={'/xeels'} element={<Xeels />} />
				<Route path={'/navigate'} element={<Navigate />} />
			</Routes>
		</div>
	)
}

export default App

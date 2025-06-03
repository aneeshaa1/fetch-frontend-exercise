import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import BrowsePage from './components/BrowsePage/BrowsePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/browse' element={<BrowsePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
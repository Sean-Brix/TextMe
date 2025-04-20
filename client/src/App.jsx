import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/register.jsx';

function App() {
 
  return (
    <>

      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>

    </>
  )
}

export default App

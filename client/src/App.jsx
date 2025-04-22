import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx';
import Chat from './Pages/Chat/Chat.jsx';

function App() {
 
  return (
    <>

      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/Chat' element={<Chat/>} />
      </Routes>

    </>
  )
}

export default App

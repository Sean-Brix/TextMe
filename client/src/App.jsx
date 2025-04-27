import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx';
import Chat from './Pages/Chat/Chat.jsx';
import People from './Pages/People/People.jsx';

function App() {
 
  return (
    <>

      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/Chat' element={<Chat/>} />
        <Route path='/People' element={<People/>}/>
      </Routes>

    </>
  )
}

export default App

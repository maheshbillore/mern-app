import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated,setAuthenticated]=useState(false); 

  const PrivateRoute = ({element})=>{ 
    return isAuthenticated ? element : <Navigate to={'/login'} /> 
  }

  return (
     <div className="App" >
      <RefreshHandler  setAuthenticated={setAuthenticated} />
     <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login/>} /> 
      <Route path='/signup' element={<Signup/>} />
      <Route path='/home' element={<PrivateRoute element={<Home />} />} />    
     </Routes>
     </div>
  );
}

export default App;

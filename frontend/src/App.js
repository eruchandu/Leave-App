import './App.css';
import { useContext } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home.js';
import Login from './components/login.js';
import Employee from './components/Employee.js';
import Admin from './components/Admin.js';
import { useState } from 'react';
import AuthProvider from './contexts/AuthProvider.js';
import Layout from './components/Layout.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './contexts/AuthContext.js'; 
import { Navigate } from 'react-router-dom';


function App() {

  
  return (
    <>
    <AuthProvider>
    <BrowserRouter>    
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home></Home>}></Route>
      <Route path='login' element={<Login></Login>}></Route>
      {/* {isLoggedIn ?(
                <Route path='employee' element={<Employee />} />
              ) : (
                <Route path='employee' element={<Navigate to="/login" />} />
              )} */}
      <Route path='employee' element={<Employee />} />
      <Route path='admin' element={<Admin></Admin>}></Route>
      </Route>
   </Routes>
  </BrowserRouter>
  <ToastContainer position='top-center'/>
  </AuthProvider>
  </>
  );
}

export default App;


import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GetDev from './components/screens/GetDev';
import PostIntegration from './components/screens/postIntegration';

import { Navbar } from './components/Navbar';
import PostDev from './components/screens/postDev';
import { Login } from './components/screens/login';
import { Register } from './components/screens/register';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    
    <div style={{ BackgroundColor: "#FFFFFF" }}>
      <div>
        
        <BrowserRouter>
        <Routes>
          <Route path='/desarrolladores' element={<PostDev/>} />
          <Route path='/' element={<GetDev/>} />
          <Route path='/integraciones' element={<PostIntegration/>} />
          <Route path='/login' element={<Login onFormSwitch={toggleForm}/>} />
          <Route path='/register' element={<Register onFormSwitch={toggleForm}/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

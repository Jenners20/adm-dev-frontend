import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GetDev from './components/screens/GetDev';
import PostIntegration from './components/screens/postIntegration';

import { Navbar } from './components/Navbar';
import PostDev from './components/screens/postDev';

function App() {
  return (
    <div style={{ BackgroundColor: "#FFFFFF" }}>
      <div>
        
        <BrowserRouter>
        <Routes>
          <Route path='/desarrolladores' element={<PostDev/>} />
          <Route path='/' element={<GetDev/>} />
          <Route path='/integraciones' element={<PostIntegration/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

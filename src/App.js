import './App.css';
import Login from './componentes/pages/login';
import Cadastro from './componentes/pages/cadastro';
import Home from './componentes/pages/home';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { getItem } from './componentes/utils/storage';

function ProtectRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectRoutes redirectTo="/login" />}>
          <Route path="/home" element={<Home />} />
        </Route >
      </Routes>
    </div>
  );
}

export default App;  

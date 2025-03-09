import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CrearUsuario from './components/CrearUsuario';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './Components/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path='/login'
              element={<Login mail={'efren.arellano@softtek.com'}></Login>}
            />
            <Route path='/crearUsuario' element={<CrearUsuario></CrearUsuario>} />
            <Route
              path='/navbar'
              element={
                <ProtectedRoute>
                  <Navbar></Navbar>
                </ProtectedRoute>
              }
            />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

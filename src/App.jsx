import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ParkingForm from './components/ParkingForm';
import ParkingList from './components/ParkingList';


function App() {
  const [refresh, setRefresh] = useState(0);
  const handleAdd = () => setRefresh(prev => prev + 1);

  // 1. Pegamos o perfil para saber quem está logado
  const perfil = JSON.parse(localStorage.getItem('@App:perfil'));
  const isAdmin = "admin"

  const handleEdit = (spot) => {
    alert('Edit mode: ' + spot.licensePlateCar);
  };

  console.log('Perfil do usuário:', perfil, 'Is Admin:', isAdmin);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
         
           {/* 2. REGRAS DE VISIBILIDADE: Só mostra o Form se for ADMIN */}
                   <Route path="/post" element={
                      <div className="mb-8 p-4 bg-gray-100 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Nova Vaga</h2>
                        <ParkingForm onAdd={handleAdd} />
                      </div>
                  } />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <div className="container mx-auto p-4">

                 
              {/* A Lista todos veem, mas ela já tem a lógica interna de esconder botões que fizemos */}
              <div className="mt-8">
                <ParkingList onEdit={handleEdit} key={refresh} />
              </div>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}


export default App;

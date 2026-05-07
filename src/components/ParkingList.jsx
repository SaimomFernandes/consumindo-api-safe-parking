import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




function ParkingList() {
  const [spots, setSpots] = useState([]); // Começa como array vazio
  const [loading, setLoading] = useState(true);


   const navigate = useNavigate();


  // 1. Pegamos o perfil que salvamos no login para saber o "role"
  const perfil = JSON.parse(localStorage.getItem('@App:perfil'));
  const isAdmin = "admin"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/parking-spot', {
          headers: {
            'Authorization': `Basic ${perfil?.token}`
          }
        });
        const data = await response.json();

        // RESOLUÇÃO DO ERRO: 
        // Se a API usa paginação, a lista está em data.content
        const listaTratada = data.content || data;
        
        setSpots(listaTratada);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [perfil?.token]);

  if (loading) return <p>Carregando vagas...</p>;
  
      const handleLogout = () => {
      localStorage.clear(); // Limpa token, role e tudo mais
      window.location.href = '/login'; // Força o recarregamento para limpar estados
    };


  return (
    <div className="bg-white p-6 rounded shadow-md ">
     

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Parking Management</h1>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sair / Trocar Usuário
            </button>
          </div>

          <div className=' flex flex-col items-center mt-20' >

                 <h2 className='pb-10'>Vagas de Estacionamento</h2>

                <table className='min-w-full table-auto border-collapse '>
                  <thead>
                    <tr className='flex justify-between  mt-4'>
                      <th className="px-4 py-2 text-left font-bold ">Vaga</th>
                      <th className="px-4 py-2 text-left font-bold ">Placa</th>
                      <th className="px-4 py-2 text-left font-bold ">Marca</th>
                      <th className="px-4 py-2 text-left font-bold ">Modelo</th>
                      <th className="px-4 py-2 text-left font-bold ">Cor</th>
                      <th className="px-4 py-2 text-left font-bold ">Responsável</th>
                      <th className="px-4 py-2 text-left font-bold ">Apartamento</th>
                      <th className="px-4 py-2 text-left font-bold ">Bloco</th>
                      {isAdmin && <th className="px-4 py-2 text-left font-bold ">Ações</th>}
                    </tr>
                  </thead>
                 
                  <tbody>
                    {/* Agora o .filter ou .map vai funcionar porque spots é um Array */}
                    {spots.map((spot) => (
                    
                                <tr key={spot.id} className=' flex justify-between items-center mb-4 mt-5 p-4 bg-gray-100 rounded shadow  '>
                        <td className="px-4 py-2  truncate">{spot.parkingSpotNumber}</td>
                        <td className="px-4 py-2" truncate>{spot.licensePlateCar}</td>
                        <td className="px-4 py-2" truncate>{spot.brandCar}</td>
                        <td className="px-4 py-2" truncate>{spot.modelCar}</td>
                        <td className="px-4 py-2" truncate>{spot.colorCar}</td>
                        <td className="px-4 py-2" truncate>{spot.responsibleName}</td>
                        <td className="px-4 py-2" truncate>{spot.apartment}</td>
                        <td className="px-4 py-2" truncate>{spot.block}</td>

                        {/* BOTÕES DE EDITAR/DELETAR: Só para ADM */}
                       
                          <td>
                            <button>✏️</button>
                            <button style={{ color: 'red' }}>🗑️</button>
                          </td>
                        </tr>
                    
                    ))}
                  </tbody>
                  </table>

               <div className='flex justify-end mt-4'>
                      {/* BOTÃO DE INSERIR: Só aparece se for ADM */}
                    
                      <button onClick={() =>navigate('/post')}>
                        ➕ Nova Vaga
                      </button>
                    
               </div>
          </div>
    </div>
  );
}

export default ParkingList;








// import { useState, useEffect } from 'react';
// import { fetchParkingSpots, deleteParkingSpot } from '../services/api';

// const ParkingList = ({ onEdit }) => {
//   const [spots, setSpots] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const loadSpots = async () => {
//     try {
//       const data = await fetchParkingSpots();
//       setSpots(data);
//     } catch (error) {
//       alert('Error loading parking spots');
//     }
//   };

//   useEffect(() => {
//     loadSpots();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure?')) {
//       try {
//         await deleteParkingSpot(id);
//         loadSpots();
//       } catch (error) {
//         alert('Error deleting');
//       }
//     }
//   };

//   const filteredSpots = spots.filter(spot =>
//     spot.responsibleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     spot.licensePlateCar.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white p-6 rounded shadow-md">
//       <input
//         type="text"
//         placeholder="Search by name or plate"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded mb-4"
//       />
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2">Spot Number</th>
//             <th className="p-2">Plate</th>
//             <th className="p-2">Brand</th>
//             <th className="p-2">Model</th>
//             <th className="p-2">Color</th>
//             <th className="p-2">Responsible</th>
//             <th className="p-2">Apartment</th>
//             <th className="p-2">Block</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredSpots.map(spot => (
//             <tr key={spot.id} className="border-b">
//               <td className="p-2">{spot.parkingSpotNumber}</td>
//               <td className="p-2">{spot.licensePlateCar}</td>
//               <td className="p-2">{spot.brandCar}</td>
//               <td className="p-2">{spot.modelCar}</td>
//               <td className="p-2">{spot.colorCar}</td>
//               <td className="p-2">{spot.responsibleName}</td>
//               <td className="p-2">{spot.apartment}</td>
//               <td className="p-2">{spot.block}</td>
//               <td className="p-2">
//                 <button onClick={() => onEdit(spot)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
//                 <button onClick={() => handleDelete(spot.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ParkingList;

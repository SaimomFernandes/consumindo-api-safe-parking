export const DashboardContent = ({ handleAdd, handleEdit, refresh }) => {
  // 1. Pegamos os dados com um fallback (objeto vazio) para não quebrar
  const savedData = localStorage.getItem('@App:perfil');
  const perfil = savedData ? JSON.parse(savedData) : null;
  
  // 2. Se não achou o perfil, mostra um carregando ou nada (evita o branco)
  if (!perfil) {
    return <div className="p-4">Carregando perfil...</div>;
  }

  const isAdmin = perfil.role === 'admin';

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Parking Management</h1>
        <button 
          onClick={() => { localStorage.clear(); window.location.href='/login'; }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair / Trocar Usuário
        </button>
      </div>
      
      <p className="mb-4">Bem-vindo, <strong>{perfil.username}</strong>!</p>

      {/* Só renderiza o form se for admin */}
      {isAdmin && (
        <div className="mb-8 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Painel do Administrador</h2>
          <ParkingForm onAdd={handleAdd} />
        </div>
      )}

      <div className="mt-8">
        <ParkingList onEdit={handleEdit} key={refresh} />
      </div>
    </div>
  );
};


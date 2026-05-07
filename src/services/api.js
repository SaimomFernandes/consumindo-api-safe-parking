const API_BASE_URL = '/api/parking-spot';



export const autenticarEBuscarDados = async (usuario, senha) => {
  const token = btoa(`${usuario}:${senha}`);

  // Fazemos um GET. Se o token estiver certo, o back responde 200.
  const response = await fetch('/api/parking-spot', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Usuário ou senha incorretos');
  }

  const dados = await response.json();
  
  // Como não tem rota de login, definimos o perfil aqui no Front
  const perfil = {
    token,
    role: usuario === 'admin' ? 'admin' : 'user', // Lógica que você definiu
    listaInicial: dados // Já aproveita os dados da busca!
  };

  localStorage.setItem('@App:perfil', JSON.stringify(perfil));
  return perfil;
};

export const fetchParkingSpots = async () => {
  
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch parking spots');
  }
  return response.json();
};

export const createParkingSpot = async (data) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create parking spot');
  }
  return response.json();
};

export const updateParkingSpot = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update parking spot');
  }
  return response.json();
};

export const deleteParkingSpot = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete parking spot');
  }
  return response.json();
};

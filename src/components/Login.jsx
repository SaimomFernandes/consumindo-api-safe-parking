import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { autenticarEBuscarDados } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  
    const dadosUsuario = await autenticarEBuscarDados(username, password);

    

    const token = btoa(`${username}:${password}`);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('isLoggedIn', 'true');
    
    localStorage.setItem('user_role', dadosUsuario.role); 

    navigate('/dashboard');

  } catch (error) {
    // Se a senha estiver errada no Back-end, ele cai aqui
    alert('Credenciais inválidas ou erro de conexão' + error.message);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login;

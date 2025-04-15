import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-vena.png';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      console.log("a")
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      localStorage.setItem('token', data.access_token);
      navigate('/admin');
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
      <img src={logo} alt="Logo Vena" className="logo" />
        <h1>Login</h1>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="input"
        />
        {erro && <p className="error">{erro}</p>}
        <button type="submit" className="button">Entrar</button>
        <button type="button" className="link" onClick={() => navigate('/register')}>Cadastrar</button>
      </form>
    </div>
  );
}
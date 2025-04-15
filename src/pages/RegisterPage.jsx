import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-vena.png';
import './register.css';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      const response = await fetch('http://localhost:3000/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erro ao registrar');

      setMensagem('Usuário registrado com sucesso');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister} className="form">
        <img src={logo} alt="Logo Vena" className="logo" />
        <h1>Cadastro</h1>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="input"
        />
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
        {mensagem && <p className="success">{mensagem}</p>}
        <button type="submit" className="button">Registrar</button>
        <button type="button" className="link" onClick={() => navigate('/')}>Voltar</button>
      </form>
    </div>
  );
}
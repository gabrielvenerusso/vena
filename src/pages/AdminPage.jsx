import React, { useState } from 'react';
import FinanceiroPage from './FinanceiroPage';
import './admin.css';

function AdminPage() {
  const [abaAtiva, setAbaAtiva] = useState('painel');

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'financeiro':
        return <FinanceiroPage />;
      case 'painel':
      default:
        return <h2>Bem-vindo ao Painel Administrativo</h2>;
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h3>Painel</h3>
        <ul>
          <li onClick={() => setAbaAtiva('painel')}>Dashboard</li>
          <li onClick={() => setAbaAtiva('financeiro')}>Financeiro</li>
        </ul>
      </aside>

      <main className="admin-main">
        {renderConteudo()}
      </main>
    </div>
  );
}

export default AdminPage;
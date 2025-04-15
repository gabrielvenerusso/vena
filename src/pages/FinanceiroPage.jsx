import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './financeiro.css';

function FinanceiroPage() {
  const [file, setFile] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [dadosImportados, setDadosImportados] = useState([]);

  const handleFileChange = (e) => {
    setMensagem('');
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) return setMensagem('Selecione um arquivo.');

    const nome = file.name.toLowerCase();
    const isCSV = nome.endsWith('.csv');
    const isXLS = nome.endsWith('.xls');
    const isXLSX = nome.endsWith('.xlsx');

    if (!isCSV && !isXLS && !isXLSX) {
      return setMensagem('Arquivo inválido. Selecione um .csv, .xls ou .xlsx');
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const conteudo = e.target.result;

      if (isCSV) {
        const linhas = conteudo.split('\n').filter(Boolean);
        const colunas = linhas[0].split(',');

        const dados = linhas.slice(1).map(linha => {
          const valores = linha.split(',');
          return colunas.reduce((obj, col, idx) => {
            obj[col.trim()] = valores[idx]?.trim();
            return obj;
          }, {});
        });

        setMensagem(`CSV importado com ${dados.length} linha(s).`);
        setDadosImportados(dados);
      }

      if (isXLS || isXLSX) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const aba = workbook.SheetNames[0];
        const planilha = workbook.Sheets[aba];
        const dados = XLSX.utils.sheet_to_json(planilha);

        setMensagem(`Excel importado com ${dados.length} linha(s).`);
        setDadosImportados(dados);
      }
    };

    if (isCSV) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="financeiro-container">
      <h2>Importar Extrato Bancário</h2>
      <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileChange} />
      <button onClick={handleImport}>Importar</button>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      {dadosImportados.length > 0 && (
        <div className="tabela-financeira">
          <h3>Dados importados:</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(dadosImportados[0]).map((coluna) => (
                  <th key={coluna}>{coluna}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dadosImportados.map((linha, i) => (
                <tr key={i}>
                  {Object.values(linha).map((valor, j) => (
                    <td key={j}>{valor}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FinanceiroPage;
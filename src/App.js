import React, { Fragment, useState } from 'react';
import Header from './components/general/Header';
import Footer from './components/general/Footer';
import CadastrarJogo from './components/pages/CadastrarJogo/CadastrarJogo';
import ListarJogos from './components/pages/ListarJogos';
import Login from './components/pages/Login/Login';


function App() {

  const [page, setPage] = useState('Login')

  return (
    <Fragment>
      <Header navigateTo={setPage}></Header>
      <main>
      {renderizarPaginaCondicional(page)}
      </main>
    </Fragment>
  );

  function renderizarPaginaCondicional(paginaAtual){
    switch(paginaAtual){
      case "ListarJogos": 
        return <ListarJogos navigateTo={setPage}/>
      case "CadastrarJogo":
        return <CadastrarJogo navigateTo={setPage}/>
      case "Login":
        return <Login navigateTo={setPage}/>
      default:
        return <h1>Erro 404. Página não encontrada</h1>
    }
  }

}

export default App;

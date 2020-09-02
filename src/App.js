import React, { Fragment, useState } from 'react';
import Header from './components/general/Header';
import CadastrarJogo from './components/pages/CadastrarJogo/CadastrarJogo';
import ListarJogos from './components/pages/ListarJogos';
import Login from './components/pages/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Jogos from './view/jogos';


function App() {

  const [page, setPage] = useState('Login')

  return (
    <Router>
      <Header></Header>
      <main>
        <Switch>

          <Route exact path='/login' component={Login}></Route>
          <Route path='/' component={Jogos}></Route>
          {/* <Route exact path='/jogos/criar' component={CadastrarJogo}></Route>
          <Route exact path='/teste' component={() => (<h1>Teste</h1>)}></Route>
          <Route exact path='/login' component={Login}></Route> */}
          <Route exact path="*" component={() => (<h1>404 | Not Found</h1>)}> </Route>
        </Switch>
      </main>
    </Router>
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

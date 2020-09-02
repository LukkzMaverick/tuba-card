import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ListarJogos from './components/pages/ListarJogos/ListarJogos';
import CadastrarJogo from './components/pages/CadastrarJogo/CadastrarJogo';
import Login from './components/pages/Login/Login';

const Routers = () => {
  return (
    <Router>
        <Switch>
            <Route exact path='/' component={ListarJogos}></Route>
            <Route exact path='/jogos/criar' component={CadastrarJogo}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path="*" component={() => (<h1>404 | Not Found</h1>)} />
        </Switch>
    </Router>
  )
}

export default Routers

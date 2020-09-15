import React, {useState} from 'react'
import {
    Switch,
    Route
  } from "react-router-dom";
import ListarJogos from '../components/pages/ListarJogos';
import CadastrarJogo from '../components/pages/CadastrarJogo/CadastrarJogo';
import EditarJogoContext from '../context/EditarJogoContext';


const Jogos = (props) => {
  const [jogoCadastro, setJogoCadastro] = useState({novoJogo: true, jogo:{}})

  return (
    <>
      <Switch>
      <EditarJogoContext.Provider value={{jogoCadastro: jogoCadastro, setJogoCadastro: setJogoCadastro}}>
        <Route exact path={props.match.path} component={ListarJogos}></Route>
        <Route exact path={`${props.match.path}jogos`} component={ListarJogos}></Route>
        <Route exact path={`${props.match.path}jogos/criar`} component={CadastrarJogo}></Route>
      </EditarJogoContext.Provider>

      </Switch> 
    </>
  )
}

export default Jogos

import React,{useEffect} from 'react'
import {
    Switch,
    Route
  } from "react-router-dom";
import ListarJogos from '../components/pages/ListarJogos';
import CadastrarJogo from '../components/pages/CadastrarJogo/CadastrarJogo';

const Jogos = (props) => {

    useEffect(() => {
      console.log(props)
    }, [])

  return (
    <>
      <Switch>
        <Route exact path={props.match.path} component={ListarJogos}></Route>
        <Route exact path={`${props.match.path}jogos`} component={ListarJogos}></Route>
        <Route exact path={`${props.match.path}jogos/criar`} component={CadastrarJogo}></Route>
      </Switch> 
    </>
  )
}

export default Jogos

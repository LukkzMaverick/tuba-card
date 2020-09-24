import React, { useEffect, useState, useCallback, useContext } from "react";
import classes from "./listar-jogos.module.css";
import Jogo from "../../../services/jogo";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AlertDialog from "../../general/alerts/AlertDialog";
import { Link } from "react-router-dom";
import {
  useHistory
} from "react-router-dom";
import EditarJogoContext from '../../../context/EditarJogoContext';
import { getUserId } from "../../../config/auth";

function ListarJogos() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoaded] = useState(false);
  const [jogosLength, setJogosLength] = useState(0)
  const [showExclusionAlert, setShowExclusionAlert] = useState(false)
  const [exclusionAlert, setExclusionAlert] = useState({jogo: '', deletarJogo: deletarJogo})
  const editar = useContext(EditarJogoContext)
  const userId = getUserId()
  const history = useHistory()
  
  

  const getList = useCallback(async () => {
    try {
      const jogosR = await Jogo.listarJogos(userId);
      if(jogosR.data.length === 0){
        history.push('/jogos/criar')
      }
      setJogos(jogosR.data);
      setJogosLength(jogosR.data.length)
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, [history, userId]);

  useEffect(() => {
    document.title = 'Jogos - Tuba Card'
    getList();
  }, [getList]);

  useEffect(() => {
    return () => {
      setJogos([])
    };
  }, []);

  function navigateToCadastrarJogosHandler(){
    editar.setJogoCadastro({novoJogo: true})
  }

  function navigateToEditarJogosHandler(jogo){
    editar.setJogoCadastro({novoJogo: false, jogo})
  }

  function handleDelete({ _id, nomeJogo }) {
    const jogo = {
      id: _id,
      nome: nomeJogo
    }
    setShowExclusionAlert(true)

    setExclusionAlert({jogo: jogo, deletarJogo: deletarJogo})
  }
  async function deletarJogo({id, nome}, confirmDelete){
    if(confirmDelete === true){
      try {
        await Jogo.deletarJogo(id);
        getList();
      } catch (error) {
        console.log(error);
      }
    }
    setShowExclusionAlert(false)
  }

  const mostrarJogos = () =>
    jogos.map((jogo, index) => {
      return (
        <section key={index} className={classes.jogoCard}>
          <div className={classes.jogoCard__rowTitle}>
            <h2 className={classes.jogoCard__title}>{jogo.nomeJogo}</h2>
            <Link to="/jogos/criar" onClick={() => navigateToEditarJogosHandler(jogo)}>
              <FontAwesomeIcon aria-label={`Remover jogo ${jogo.nomeJogo}`}
                className={classes.jogoCard__edit}
                size="1x"
                icon={faEdit} />
              </Link>
            <FontAwesomeIcon aria-label={`Remover jogo ${jogo.nomeJogo}`}
              onClick={() => handleDelete(jogo)}
              className={classes.jogoCard__trash}
              size="1x"
              icon={faTrashAlt}
            />
          </div>
          <div className={classes.jogoCard__content}>
            <ul className={classes.jogoCard__lista}>
              {jogo.propriedades.map((propriedade, index) => (
                <li key={index} className={classes.jogoCard__listItem}>
                  {propriedade}
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    });

  return (
    <div className={[classes.listarJogos, "container"].join(" ")}>
      <h2 className={[classes.title, 'centered-title'].join(" ")}>Meus Jogos</h2>
      
      <section className={jogosLength <= 2 ? [classes.jogos, classes.jogosWithTwoElements].join(' ') : classes.jogos}>
        {!loading ? (
          <Loader className={classes.loader}
            type={"ThreeDots"}
            color={"#4385F5"}
            width={100}
            height={100}
          />
        ) : (
          mostrarJogos()
        )}
        
        
      </section>
      {showExclusionAlert ? <AlertDialog {...exclusionAlert}></AlertDialog> : ''}
      <div className={classes.addJogo}>
        <Link to='/jogos/criar' onClick={navigateToCadastrarJogosHandler}>
          <Fab color="primary" aria-label="Criar um novo jogo">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      
    </div>
  );
}

export default ListarJogos;

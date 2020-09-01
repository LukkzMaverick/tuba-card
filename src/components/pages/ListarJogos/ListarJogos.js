import React, { Fragment, useEffect, useState, useCallback } from "react";
import classes from "./listar-jogos.module.css";
import Jogo from "../../../services/jogo";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AlertDialog from "../../general/alerts/AlertDialog";

function ListarJogos({ navigateTo }) {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoaded] = useState(false);
  const [jogosLength, setJogosLength] = useState(0)
  const [showExclusionAlert, setShowExclusionAlert] = useState(false)
  const [exclusionAlert, setExclusionAlert] = useState({jogo: '', deletarJogo: deletarJogo})
  
  useEffect(() => {
    getList();
  }, []);

  const getList = useCallback(async () => {
    try {
      const jogosR = await Jogo.listarJogos();
      console.log(jogosR.data.length)
      if(jogosR.data.length === 0){
        console.log('entrou no if')
        navigateTo('CadastrarJogo')
      }
      setJogos(jogosR.data);
      setJogosLength(jogosR.data.length)
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      <h2 className={classes.title}>Meus Jogos</h2>
      
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
        <Fab onClick={() => navigateTo('CadastrarJogo')} color="primary" aria-label="Criar um novo jogo">
          <AddIcon />
        </Fab>
      </div>
      
    </div>
  );
}

export default ListarJogos;

import React, { useState, Fragment, useEffect, useContext } from 'react'
import classes from './cadastrar-jogo.module.css'
import jogo from '../../../services/jogo'
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import EditarJogoContext from '../../../context/EditarJogoContext';
import { getUserId } from '../../../config/auth';

function CadastrarJogo(){
    const [mostrarErros, setMostrarErros] = useState(false)
    const [mostrarAlertSucess, setMostrarAlertSucess] = useState(false)
    const [mensagensErro, setMensagensErro] = useState([])
    const [botaoHabilitado, setBotaoHabilitado] = useState(true)
    const history = useHistory()
    const editar = useContext(EditarJogoContext)
    const novoJogo = editar.jogoCadastro.novoJogo
    const [form, setForm] = useState({
        nomeJogo: '',
        quantidadePropriedades: '',
        propriedades: [
            
        ]
    })

    useEffect(() => {
        if(novoJogo === true){
            document.title = 'Criar Jogo - Tuba Card'
        }else{
            document.title = 'Editar Jogo - Tuba Card'
            const jogo = editar.jogoCadastro.jogo
            const quantidadePropriedades = jogo.propriedades.length
            setForm({nomeJogo: jogo.nomeJogo, quantidadePropriedades: jogo.propriedades.length,propriedades: jogo.propriedades})
            setTimeout(() => {
                for(let i = 1; i <= quantidadePropriedades; i++){
                    document.querySelector(`#propriedade${i}`).value = jogo.propriedades[i-1]
                }
            }, 10);
        }
      return () => {
      };
    }, [])

    const formHandler = (event) => {
        if(event.target.name == 'quantidadePropriedades'){
            if(event.target.value !== ''){
                if(event.target.value < 2 || event.target.value > 5){
                    return displayErrors(["Quantidade de atributos precisa ser um valor entre 2 e 5"]);
                }
            }
        }
        setForm({
            ...form,
            [event.target.name]: event.target.value
        }) 
    }

    function isFormValid(){
        let nomeJogoValidation = false
        let quantidadeDePropriedadesValidation = false
        let retorno = []
        if(form.nomeJogo != ''){
            nomeJogoValidation = true
        }else{
            retorno.push('O campo Nome do jogo é obrigatório.')
        }
        if(form.quantidadePropriedades != ''){
            quantidadeDePropriedadesValidation = true
        }else{
            retorno.push('O campo Quantidade de atributos é obrigatório.')
        }
        if(nomeJogoValidation && quantidadeDePropriedadesValidation)
            return true
        else return Array.from(retorno)
    }

    async function requestHandler(requestType){
        if(isFormValid() === true){
            setMostrarErros(false)
            setMensagensErro([])
            let propriedades = document.getElementsByName('propriedades[]')
            const propriedadesArray = []
            let erros = []
            let i = 0
            propriedades.forEach((propriedade) =>{
                i++
                if(!propriedade.value){
                    erros.push(`O campo atributo ${i} é obrigatório.`)
                }
                propriedadesArray.push(propriedade.value)
            })
            if(erros.length > 0)
                return displayErrors(erros)
            let response;
            const userId = getUserId()
            switch(requestType){
                case 'post': response = await jogo.criarJogo(form.nomeJogo, propriedadesArray, userId); break;
                case 'put': response = await jogo.editarJogo(editar.jogoCadastro.jogo._id, form.nomeJogo, propriedadesArray); break;
            }
            if(response.status === 201 || response.status === 202){
                setMostrarAlertSucess(true)
                setBotaoHabilitado(false)
                setTimeout(() => {
                    history.push('/jogos')
                }, 3000);
            }
        }else{
            
            const errors = isFormValid()
            displayErrors(errors)
        }
    }

    function displayErrors(errors){
        let erroList = []

        errors.map((erro) => {
            erroList.push(<li>{erro}</li>)
        })

        setMostrarErros(true)
        setMensagensErro(erroList)
    }

    const mostrarCamposPropriedades = () =>{
        let rows = []
        for(let i = 0; i < form.quantidadePropriedades; i++){
            rows.push(<label key={`-${i}`} htmlFor={`propriedade${i+1}`}>{`Atributo ${i+1}`} </label>) 
            rows.push(<input key={i} required placeholder={'Nome do atributo. Exemplos: Ataque, altura, peso...'} 
            name={`propriedades[]`} id={`propriedade${i+1}`} type='text' />) 
        }
        
        return <Fragment>{rows}</Fragment>
    }

    return (
        <div className={[classes.criarJogo, 'container'].join(' ')}>
            <h2 className={classes.criarJogo__title}>{novoJogo ? 'Criar Jogo' : 'Editar Jogo'}</h2>
            <form className={classes.criarJogo__form}>
                {mostrarAlertSucess ? <Alert className={classes.criarJogo__sucessAlert} severity="success">
  {novoJogo ? 'Jogo criado com sucesso!' : 'Jogo editado com sucesso!'}
</Alert> : ''}
                <ul className={classes.criarJogo__errorList}>
                    {mostrarErros ? <Alert  className={classes.criarJogo__errorMessage} severity="error">
                        {mensagensErro}
                    </Alert> : ''}
                </ul>
                <label htmlFor="nomeJogo">Nome do jogo</label>
                <input onChange={formHandler} type="text" name="nomeJogo" id="nomeJogo" value={form.nomeJogo} required/>
                <label htmlFor="quantidadePropriedades">Quantidade de atributos</label>
                <input min={2} max={5} onChange={formHandler} value={form.quantidadePropriedades} type="number" name='quantidadePropriedades' 
                id="quantidadePropriedades" required placeholder="Mínimo: 2, máximo: 5"/>
                {mostrarCamposPropriedades()}
                <button disabled={!botaoHabilitado} onClick={novoJogo ? () => requestHandler('post') : () => requestHandler('put')} className={classes.criarJogo__button} type="button">Criar</button>
            </form>
        </div>
    )

}

export default CadastrarJogo
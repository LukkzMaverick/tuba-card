import React, { useEffect, useState, Fragment } from 'react'
import classes from './cadastrar-jogo.module.css'
import jogo from '../../../services/jogo'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';



function CadastrarJogo({navigateTo}){
    const [mostrarErros, setMostrarErros] = useState({show: false, erros: []})
    const [mostrarAlertSucess, setMostrarAlertSucess] = useState(false)
    const [botaoHabilitado, setBotaoHabilitado] = useState(true)
    const [form, setForm] = useState({
        nomeJogo: '',
        quantidadePropriedades: '',
        propriedades: [
            
        ]
    })

    const formHandler = (event) => {
        if(event.target.name == 'quantidadePropriedades'){
            if(event.target.value !== ''){
                if(event.target.value < 2 || event.target.value > 5){
                    return displayErrors();
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

    async function postHandler(event){
        event.preventDefault()
        if(isFormValid() === true){
            setMostrarErros({show: false, erros: []})
            let propriedades = document.getElementsByName('propriedades[]')
            const propriedadesArray = []
            let erros = []
            let i = 0
            propriedades.forEach((propriedade) =>{
                i++
                if(!propriedade.value){
                    erros.push(`O campo atributo ${i} é obrigatório`)
                }
                propriedadesArray.push(propriedade.value)
            })
            if(erros.length > 0)
                return displayErrors(erros)
            const response = await jogo.criarJogo(form.nomeJogo, propriedadesArray)
            if(response.status == 201){
                setMostrarAlertSucess(true)
                setBotaoHabilitado(false)
                setTimeout(() => {
                    navigateTo('ListarJogos')
                }, 3000);
            }
        }else{
            const errors = isFormValid()
            displayErrors(errors)
        }
    }

    function displayErrors(errors){
        setMostrarErros({show: true, erros: errors})
    }

    function mostrarCamposPropriedades(){
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
            <h2 className={classes.criarJogo__title}>Criar jogo</h2>
            <form className={classes.criarJogo__form}>
                {mostrarAlertSucess ? <Alert className={classes.criarJogo__sucessAlert} severity="success">
  Jogo criado com sucesso! 
</Alert> : ''}
                <ul className={classes.criarJogo__errorList}>
                    {mostrarErros.show ? <Alert  className={classes.criarJogo__errorMessage} severity="error"><AlertTitle>Erro(s)</AlertTitle>{mostrarErros.erros.map((erro) => {
                        return (<li>{erro}</li>)
                    })}</Alert> : ''}
                </ul>
                <label htmlFor="nomeJogo">Nome do jogo</label>
                <input onChange={formHandler} type="text" name="nomeJogo" id="nomeJogo" value={form.nomeJogo} required/>
                <label htmlFor="quantidadePropriedades">Quantidade de atributos</label>
                <input min={2} max={5} onChange={formHandler} value={form.quantidadePropriedades} type="number" name='quantidadePropriedades' 
                id="quantidadePropriedades" required placeholder="Mínimo: 2, máximo: 5"/>
                {mostrarCamposPropriedades()}
                <button disabled={!botaoHabilitado} onClick={postHandler} className={classes.criarJogo__button} type="submit">Criar</button>
            </form>
        </div>
    )

}

export default CadastrarJogo
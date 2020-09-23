import React, { useState, useContext, Fragment,useEffect } from 'react';
import classes from './login.module.css'
import user from '../../../services/user'
import { saveToken, getToken } from '../../../config/auth';
import { useHistory } from 'react-router-dom';
import LoginContext from '../../../context/LoginContext';
import http from '../../../config/config';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';

function Login() {
  const [loading, setLoading] = useState(false)
  const [mostrarAlertError, setMostrarAlertError] = useState(false)
  const [mensagensErro, setMensagensErro] = useState([])
  const history = useHistory()
  const [form, setForm] = useState({
    email: '',
    senha: '',
})
  const login = useContext(LoginContext)

  useEffect(() => {
    document.title = 'Login - Tuba Card'
    document.addEventListener('keypress', enviarFormPeloEnter)
    return () => {
      document.removeEventListener('keypress', enviarFormPeloEnter)
    };

    function enviarFormPeloEnter(e){
      if(e.key === 'Enter'){
        let botaoLogin = document.querySelector('#botaoLogin')
        console.log('minha opiniao')
        botaoLogin.click()
      }
    }

  }, [])

  function formHandler(event){
    setForm({
      ...form,
      [event.target.name]: event.target.value
    }) 
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      const {data} = await user.logar(form)
      saveToken(data.token, data.user.id)
      login.setIsLogged(true)
      http.defaults.headers['x-auth-token'] = getToken()
      history.push('/jogos')
    } catch (error) {
      let erros = []
      error.response.data.errors.map((error, index) => {
        erros.push(<li key={index} >{error.msg}</li>)
      })
      setLoading(false)
      setMostrarAlertError(true)
      setMensagensErro(<Fragment>{erros}</Fragment>)
    }
  }
    
  return (
    
    
    <div className='container'>
        <form className={classes.login}>
        <h2 className={classes.login__title}>Login</h2>
        {mostrarAlertError ? <Alert className={classes.alertError} severity="error">
          <ul>
          {mensagensErro}
          </ul>
        </Alert> : ''}
          <label className={classes.login__label} htmlFor='email'>Email</label>
          <input onChange={formHandler} value={form.email} className={classes.login__input} id='email' name='email' type='email'></input>
          <label className={classes.login__label} htmlFor='senha'>Senha</label>
          <input onChange={formHandler} value={form.senha} className={classes.login__input} id='senha' name='senha' type='password'></input>
          {loading ? <CircularProgress size={40}></CircularProgress> : ''}
          <button id={'botaoLogin'} type='button' onClick={() => handleLogin()} className={classes.login__button}>Entrar</button>
        </form>
    </div>
  )
}

export default Login;
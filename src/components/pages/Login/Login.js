import React, { Fragment } from 'react';
import classes from './login.module.css'

function Login({navigateTo}) {
  return (
    <div className='container'>
        <form className={classes.login}>
        <h2 className={classes.login__title}>Login</h2>
            <label className={classes.login__label} htmlFor='email'>Email</label>
            <input className={classes.login__input} id='email' name='email' type='email'></input>
            <label className={classes.login__label} htmlFor='senha'>Senha</label>
            <input className={classes.login__input} id='senha' name='senha' type='password'></input>
            <button onClick={() => navigateTo('ListarJogos')} className={classes.login__button}>Entrar</button>
        </form>
    </div>
  )
}

export default Login;
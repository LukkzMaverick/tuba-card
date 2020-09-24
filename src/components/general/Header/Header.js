import React, { Fragment, useContext } from 'react'
import classes from './header.module.css'
import { Link  } from 'react-router-dom'
import { removeToken } from '../../../config/auth';
import LoginContext from '../../../context/LoginContext';
function Header(){
    const login = useContext(LoginContext)
    function handleLogout(){
        removeToken()
        login.setIsLogged(false)
    }
    
    return (
        <header className={classes.header}>
            <div className={[classes.header__container, 'container'].join(' ')}>
                <h1 className={classes.header__title}>Tuba Card</h1>
                <nav className={classes.navbar}>
                    <ul>
                        {login.isLogged ? 
                        <Fragment>
                            <li><Link to='/jogos'>Home</Link></li>
                            <li><Link to='/login' onClick={handleLogout}>Sair</Link></li>
                        </Fragment> : 
                        <Fragment>
                            <li><Link to='/login'>Entrar</Link></li>
                            <li><Link to='/register'>Registre-se</Link></li>
                        </Fragment>}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
import React from 'react'
import classes from './header.module.css'
import { Link } from 'react-router-dom'
function Header(){


    return (
        <header className={classes.header}>
            <div className={[classes.header__container, 'container'].join(' ')}>
                <h1 className={classes.header__title}>Tuba Card</h1>
                <nav className={classes.navbar}>
                    <ul>
                        <li><Link to='/jogos'>Home</Link></li>
                        <li><Link to='/login'>Entrar</Link></li>
                        <li><Link>Registre-se</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
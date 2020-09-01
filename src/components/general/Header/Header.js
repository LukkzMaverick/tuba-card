import React from 'react'
import classes from './header.module.css'
function Header({navigateTo}){
    return (
        <header className={classes.header}>
            <div className={[classes.header__container, 'container'].join(' ')}>
                <h1 className={classes.header__title}>Tuba Card</h1>
                <nav className={classes.navbar}>
                    <ul>
                        <li><a href="#" onClick={() => navigateTo('ListarJogos')}>Home</a></li>
                        <li><a href="#" onClick={() => navigateTo('Login')}>Entrar</a></li>
                        <li><a href="#">Registre-se</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
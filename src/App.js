import React, { useState } from 'react';
import Header from './components/general/Header';
import Login from './components/pages/Login/Login';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Jogos from './view/jogos';
import { isAuthenticated } from './config/auth';
import LoginContext from './context/LoginContext';
import Register from './components/pages/Register';

function App() {

  const [isLogged, setIsLogged] = useState(isAuthenticated())

  const PrivateRoute = ({...rest}) => {
    if(!isAuthenticated()){
      return <Redirect to='/login'></Redirect>
    }
    return <Route {...rest}></Route>
    
  }

  return (
    <Router>
      <LoginContext.Provider value={{isLogged: isLogged, setIsLogged: setIsLogged}}>
        <Header></Header>
        <main>
          <Switch>

            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
              <PrivateRoute path='/' component={Jogos}></PrivateRoute>
            {/* <Route exact path='/jogos/criar' component={CadastrarJogo}></Route>
            <Route exact path='/teste' component={() => (<h1>Teste</h1>)}></Route>
            <Route exact path='/login' component={Login}></Route> */}
            
          </Switch>
        </main>
      </LoginContext.Provider>
    </Router>
  );

}

export default App;

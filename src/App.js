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
              <PrivateRoute path='/' component={Jogos}></PrivateRoute>
            {/* <Route exact path='/jogos/criar' component={CadastrarJogo}></Route>
            <Route exact path='/teste' component={() => (<h1>Teste</h1>)}></Route>
            <Route exact path='/login' component={Login}></Route> */}
            <Route exact path="*" component={() => (<h1>404 | Not Found</h1>)}> </Route>
          </Switch>
        </main>
      </LoginContext.Provider>
    </Router>
  );

}

export default App;

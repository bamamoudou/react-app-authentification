import React from 'react'
import Login from './pages/Login/LoginForm'
import AuthContext, { initialValues } from './context/authentication-context'
import Inscription from './pages/Inscription/SignUpForm'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      ...initialValues
    }
  }

  setToken = (authenticated, jwt) => {
    this.setState({
      authenticated: authenticated, // equivalent à juste écrire authenticated, jwt
      jwt: jwt
    })
  }

  render() {
    return (
      <> 
        <BrowserRouter>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            jwt: this.state.jwt,
            setToken: this.setToken
          }}>
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/inscription" component={Inscription}/>
            </Switch>
          </AuthContext.Provider>
        </BrowserRouter>
      </>
    )
  }
}

export default App

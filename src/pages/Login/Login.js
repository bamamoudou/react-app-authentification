import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import styles from './LoginForm.module.css'
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            password: "",
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault()
        const loginRequest = {...this.state}
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.history.push("/")
        }).catch(error => {
            console.log(error)
        });
    }
    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <form className={styles.loginForm}>
                <h1>Connexion</h1> 
                <div className={styles.txtb}>
                    <label htmlFor="usernameOrEmail">Email ou Username</label>
                    <input type="text" name="usernameOrEmail" id="usernameOrEmail" placeholder="Username ou Email" autoComplete="off" value={this.state.usernameOrEmail} onChange={this.onChangeHandler} />  
                </div>
                <div className={styles.txtb}>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" placeholder="Mot de passe" autoComplete="off" value={this.state.password} onChange={this.onChangeHandler} />                    
                </div>
                <div>
                    <button  htmlType="submit"  className={styles.logbtn} onClick={this.handleSubmit}>Se connecter</button>
    
                </div>
                <div className={styles.bottomText}>
                    Tu n'as pas de compte? <Link to="/inscription">Inscris-toi ici</Link>
                </div>
            </form>
        );
    }
}
export default Login;
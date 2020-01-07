import React, { Component } from 'react'
import styles from './LoginForm.module.css'
import AuthContext from '../../context/authentication-context'
import { Link } from 'react-router-dom'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            error: ""
        }
    }

    static contextType = AuthContext

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault() // Evite le raffraichissement de la page (dans notre cas)
        console.log(this.context)
        fetch('http://localhost:8080/user', {
             credentials: "include", // A ajouter pour communiquer avec votre serveur Java
            method: 'get'
        }).then(response => response.json())
        .then(result => {
            const {jwt} = result.find(user => {
                if(user.username !== this.state.username)
                    return null
                if (user.password !== this.state.password)
                    return null
                return user
            }) || ''
            console.log(jwt)
            if (jwt) {
                this.context.setToken(true, jwt)
                // history.push('/profile')
            } else {
                this.setState({
                    error: "Wrong username or/and password"
                })
            }

        })
    }

    render() {
        return (
            <form action="index.html" className={styles.loginForm}>
                <h1>Login</h1>
                {this.props.children}

                <div className={styles.txtb}>
                    <label htmlFor="username">Email</label>
                    <input type="text" name="username" id="username" autoComplete="off" value={this.state.username} onChange={this.onChangeHandler} className={this.state.username.length > 0 ? styles.filled : null }/>
                </div>

                <div className={styles.txtb}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" autoComplete="off" value={this.state.password} onChange={this.onChangeHandler}/>
                </div>

                <button className={styles.logbtn} onClick={this.onSubmit}>Se connecter</button>

                <div className={styles.bottomText}>
                    vous n'avez pas de compte? <Link to="/inscription">S'inscrire</Link>
                </div>
            </form>
        )
    }
}

// Export nommé
// export { LoginForm }
// Export par défaut
export default LoginForm
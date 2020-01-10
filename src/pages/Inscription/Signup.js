import React, { Component } from 'react';
import { signup } from '../../util/APIUtils';
import {validateEmailAvailability, validateEmail, validateName, validateUsername, validatePassword, validateUsernameAvailability} from '../../util/ValidationUtils'
import styles from './SignUpForm.module.css'
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        // this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        // this.isFormInvalid = this.isFormInvalid.bind(this);
    }
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        console.log(inputName, inputValue)
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        signup(signupRequest)
        .then(response => {
            this.props.history.push("/login");
        }).catch(error => {
            console.log(error)
        });
    }
    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    onBlurEmail = async () => {
        const result = await validateEmailAvailability(this.state.email.value)
        this.setState(result)
    }
    onBlurUsername = async () => {
        const result = await validateUsernameAvailability(this.state.username.value)
        this.setState(result)
    }

  render() {
     return (
        <>
            <form onSubmit={this.handleSubmit} className={styles.signUp} >
                <h1>Inscription</h1>
                <div className={styles.champ} 
                     hasFeedback
                     validateStatus={this.state.name.validateStatus}
                     help={this.state.name.errorMsg}>
                      <label htmlFor="nom">Nom Complet: </label>
                      <input type="name" name="name" id="nom" 
                                autoComplete="off"
                                placeholder="Ton nom et prénom"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, validateName)} />    
                </div>
                <div className={styles.champ}
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <label htmlFor="username">Nom d'utilisateur: </label>
                            <input type="username"
                                name="username" 
                                autoComplete="off"
                                placeholder="Ton nom d'utilisateur"
                                value={this.state.username.value} 
                                onBlur={this.onBlurUsername}
                                onChange={(event) => this.handleInputChange(event, validateUsername)} />    
                        </div>
                        <div className={styles.champ}
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                             <label htmlFor="email">Email: </label>
                            <input type="email" 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Ton email"
                                value={this.state.email.value} 
                                onBlur={this.onBlurEmail}
                                onChange={(event) => this.handleInputChange(event, validateEmail)} />    
                        </div>
                        <div className={styles.champ}
                            label="Mot de passe"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                             <label htmlFor="password">Mot de passe: </label>
                            <input type="password"
                                name="password" 
                                type="password"
                                autoComplete="off"
                                placeholder="Ton mot de passe! Entre 6 et 20 caractères" 
                                value={this.state.password.value} 
                                onChange={(event) => this.handleInputChange(event, validatePassword)} />    
                        </div>
                        <div>
                            <button 
                                htmlType="submit"  
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>S'inscrire</button>
                            Déja inscrit? <Link to="/login">Connectes-toi!</Link>
                        </div>
                </form>
           </>   
        );
    }
}
export default Signup;
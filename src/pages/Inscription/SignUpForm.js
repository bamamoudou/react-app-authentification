import React, { useState } from 'react'
import styles from './SignUpForm.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


const SignUpForm = () => {
    const initialState = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [state, setstate] = useState(initialState)

    const onChangeHandler = (event) => {
        event.persist()
        setstate(prevstate => ({
            ...prevstate,
            [event.target.name]: event.target.value
        }))
    }
    const onSubmitHandler = event => {
        // event.preventDefault()
        // const data = {
        //     userName: state.email ,
        //     password: state.password,
        //     roles: [
        //         {
        //             titre: "ROLE_USER"
        //         }
        //     ]
        // }
        const data = {
            userName:"fabio@email.com",
            password: "fabio",
            roles: [
                {
                    titre: "ROLE_USER"
                }
            ]
        }

        const payload = new FormData()
        payload.append("json", JSON.stringify(data))

        const myHeaders = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        })
        fetch("http://localhost:8080/user", {
            credentials: "include", 
            method: "POST",
            // headers: myHeaders,
            body:payload
        }).then(res => console.log(res))
        // axios(
        //     {
        //         url: "http://localhost:8080/user/",
        //         withCredentials: true,
        //         method: "post",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //         },
        //         data: data
        //     }
        // ).then(res => console.log(res))
    }

    onSubmitHandler()

    return (
        <>
             <form className={styles.signUp}>
                <h1>Inscription</h1>
                <div className={styles.champ}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={onChangeHandler} value={state.email} />
                </div>

                <div className={styles.champ}>
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" name="password" id="password" onChange={onChangeHandler} value={state.password} />
                </div>
                <div className={styles.champ}>
                    <label htmlFor="confirm-password">Confirmation du mot de passe: </label>
                 <input type="password" name="confirmPassword" id="confirm-password" onChange={onChangeHandler} value={state.confirmPassword} />
                </div>

                <button onClick={onSubmitHandler}>S'inscrire</button>

                <div>
                    Déjà inscrit! Connectez-vous <Link to="/login">Se connecter</Link>
                </div>
            </form>
        </>
    )
}

export default SignUpForm

import { NAME_MIN_LENGTH, NAME_MAX_LENGTH,  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, EMAIL_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../constants';
import { checkUsernameAvailability, checkEmailAvailability } from '../util/APIUtils';
 // Validation des champs
export const validateName = (name) => {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Ton nom est trop court (Minimum ${NAME_MIN_LENGTH}  nécessaires.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Ton nom est trop long (Maximum ${NAME_MAX_LENGTH} autorisés.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}
export const validateEmail = (email) => {
    if(!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Ce champ est obligatoire'                
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email non valide'
        }
    }

    if(email.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Email trop long (Maximum ${EMAIL_MAX_LENGTH} autorisés)`
        }
    }

    return {
        validateStatus: null,
        errorMsg: null
    }
}

export const validateUsername = (username) => {
    if(username.length < USERNAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Ton Username est trop court (Minimum ${USERNAME_MIN_LENGTH} nécessaires.)`
        }
    } else if (username.length > USERNAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Ton Username est trop long (Maximum ${USERNAME_MAX_LENGTH} autorisés.)`
        }
    } else {
        return {
            validateStatus: null,
            errorMsg: null
        }
    }
}

export const validateUsernameAvailability = ( usernameValue) => {
    // Vérification de la validité du username coté front
    const usernameValidation = validateUsername(usernameValue);

    if(usernameValidation.validateStatus === 'error') {
        return({
            username: {
                value: usernameValue,
                ...usernameValidation
            }
        });
    }

  return checkUsernameAvailability(usernameValue)
    .then(response => {
        if(response.available) {
            return({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        } else {
            return({
                username: {
                    value: usernameValue,
                    validateStatus: 'error',
                    errorMsg: 'Ce username existe déja'
                }
            });
        }
    }).catch(error => {
        // Considérer que validateStatus a réussi, le formulaire sera rechecké coté server
        return({
            username: {
                value: usernameValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
    });
}
export const validateEmailAvailability = (emailValue) => {
    // Vérification de la validité de l'email coté front
    const emailValidation = validateEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
        return({
            email: {
                value: emailValue,
                ...emailValidation
            }
        })
    }
   
    // this.setState({
    //     email: {
    //         value: emailValue,
    //         validateStatus: 'validating',
    //         errorMsg: null
    //     }
    // });
    return checkEmailAvailability(emailValue)
    .then(response => {
        if(response.available) {
            return ({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        } else {
            return ({
                email: {
                    value: emailValue,
                    validateStatus: 'error',
                    errorMsg: 'Cet Email existe déja'
                }
            });
        }
    }).catch(error => {
        //  Considérer que validateStatus a réussi, le formulaire sera rechecké coté server
        return ({
            email: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
    });
}
export const validatePassword = (password) => {
    if(password.length < PASSWORD_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Ton mot de passe est trop court (Minimum ${PASSWORD_MIN_LENGTH} nécessaires.)`
        }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Ton mot de passe est trop long (Maximum ${PASSWORD_MAX_LENGTH} autorisés.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };            
    }
}
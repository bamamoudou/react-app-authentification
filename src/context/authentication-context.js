import React from 'react'

const initialValues = {
    authenticated: false,
    jwt: ""
}

const authContext = React.createContext({
    ...initialValues,
    setToken: () =>{}
})

export { authContext as default, initialValues}
const TOKEN_KEY = 'tuba-card-token'

const getToken = () => localStorage.getItem(TOKEN_KEY)

const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    isAuthenticated()
}


const isAuthenticated = () => {
    // pegar dentro do localstage
    // validar o token 
    // retornar se true ou false
    return getToken() !== null
}


export {
    isAuthenticated,
    getToken,
    saveToken,
    removeToken
}

const TOKEN_KEY = 'tuba-card-token'
const USER_ID = 'tuba-card-user-id'

const getToken = () => localStorage.getItem(TOKEN_KEY)

const getUserId = () => localStorage.getItem(USER_ID)

const saveToken = (token, userId) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_ID, userId)
}

const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_ID)
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
    removeToken,
    getUserId
}

import http from '../config/config'

const listarJogos = (userId) => http.get(`/jogos/${userId}`)
const deletarJogo = (jogoId) => http.delete(`/jogos/${jogoId}`)
const criarJogo = (nomeJogo, propriedades, userId) => http.post('/jogos',{nomeJogo: nomeJogo, propriedades: propriedades, userId: userId})
const editarJogo = (id, nomeJogo, propriedades) => http.put(`/jogos/${id}`,{nomeJogo: nomeJogo, propriedades: propriedades})

export default{listarJogos, deletarJogo, criarJogo, editarJogo}
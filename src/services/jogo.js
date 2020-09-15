import http from '../config/config'

const listarJogos = () => http.get('/jogos')
const deletarJogo = (jogoId) => http.delete(`/jogos/${jogoId}`)
const criarJogo = (nomeJogo, propriedades) => http.post('/jogos',{nomeJogo: nomeJogo, propriedades: propriedades})
const editarJogo = (id, nomeJogo, propriedades) => http.put(`/jogos/${id}`,{nomeJogo: nomeJogo, propriedades: propriedades})

export default{listarJogos, deletarJogo, criarJogo, editarJogo}
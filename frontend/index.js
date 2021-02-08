// vamos começar, carregando o express e criando a app
const app = require('express')()
const path = require('path')

// então, criamos uma rota para '/'
app.get('/', (req, res) => {
    // aqui precisamos enviar o index.html para o cliente
    res.sendFile(path.join(__dirname + '/views/index/index.html'))
})

app.get('/createUser', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/auth/create-user.html'))
})

// no fim, iniciamos o serviço na porta 8001
app.listen(8002)
console.log('8002 é a porta mágica!')
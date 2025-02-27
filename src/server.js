const express = require('express')
const cors = require('cors')
const connection = require('./db_config')
const port = 3025
const app = express()

app.use(cors())
app.use(express.json())

//Rotas API
//cadastrar carro
app.post('/carro/cadastrar', (request, response) =>{
    let params = Array(
        request.body.placa,
        request.body.motorista,
        request.body.senha,
        null
    )

    let query = 'INSERT INTO carros(placa, motorista, senha, vaga_identificador) VALUES (?, ?, ?, ?)'

    connection.query(query, params, (err, results) =>{
        if (results){
            response
            .status(200)
            .json({
                success: true,
                message: 'Sucesso',
                data: results
            })
        } else{
            response
            .status(500)
            .json({
                success: false,
                message: 'Sem sucesso',
                data: err
            })
        } 
    })
})

//logar carro
app.post('/carro/login', (request, response) =>{
    let params = Array(
        request.body.placa,
        request.body.senha
    )

    let query = 'SELECT * FROM carros WHERE placa = ? AND senha = ?'

    connection.query(query, params, (err, results) =>{
        if (results.length > 0){
            response
            .status(200)
            .json({
                success: true,
                message: 'Sucesso',
                data: results[0]
            })
        } else{
            response
            .status(500)
            .json({
                success: false,
                message: 'Sem sucesso',
                data: err
            })
        } 
    })
})


//Iniciar servidor
app.listen(port, () => console.log(`Rodando na porta ${port}`))
const express = require('express')
const cors = require('cors')
const connection = require('./db_config')
const port = 3025
const app = express()

app.use(cors())
app.use(express.json())

//Rotas API
// Rota POST para cadastrar carro
app.post('/carro/cadastrar', (request, response) =>{
    let params = Array(
        request.body.placa,
        request.body.motorista,
        request.body.senha,
    )

    let query = 'INSERT INTO carros(placa, motorista, senha) VALUES (?, ?, ?)'

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

// Rota POST para logar carro
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

// Rota PUT para atualizar vaga ocupada para 'true'
app.put('/vaga/editar', (request, response) =>{
    let params = Array(
        request.body.ocupado,
        request.body.carro_id,
        request.body.identificador
    )
    let query = 'UPDATE vagas SET ocupado = ?, carro_id = ? WHERE identificador = ?'
    connection.query(query, params, (err, results) => {
        if ( results && results.affectedRows > 0){
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

//listar vagas ocupadas
app.get('/vagas', (request, response) => {
    const query = 'SELECT identificador, tipo_vaga, tipo_pref, carro_id FROM vagas WHERE carro_id IS NOT NULL'
    connection.query(query, (err, results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: 'Sucesso',
                data: results
            }) 
        } else{
            response
            .status(500)
            .json({
                sucess: false,
                message: 'Sem sucesso',
                data: err
            }) 
        }
    })
})

//Listar carros
app.get('/carros', (request, response) => {
    const query = 'SELECT id, placa, motorista FROM carros'
    connection.query(query, (err, results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: 'Sucesso',
                data: results
            }) 
        } else{
            response
            .status(500)
            .json({
                sucess: false,
                message: 'Sem sucesso',
                data: err
            }) 
        }
    })
})

//Excluir carro
app.delete('/carro/deletar/:id', (request, response) =>{
    let params = request.params.id
    let query = 'DELETE FROM carros WHERE id = ?'
    connection.query(query, params, (err, results) =>{
        if(results) {
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

//Editar carro
app.put('/carro/editar/:id', (request, response) =>{
    let params = Array(
        request.body.placa,
        request.body.motorista,
        request.params.id
    )

    let query = 'UPDATE carros SET placa = ?, motorista = ? WHERE id = ?'

    connection.query(query, params, (err, results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: 'Sucesso',
                data: results
            }) 
        } else{
            response
            .status(500)
            .json({
                sucess: false,
                message: 'Sem sucesso',
                data: err
            }) 
        }

    })
})

//Iniciar servidor
app.listen(port, () => console.log(`Rodando na porta ${port}`))
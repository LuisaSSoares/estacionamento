const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'sistema_estacionamento'
})

connection.connect((err) => {
    if (err){
        throw err
    } else{
        console.log('Mysql Conectado')
    }
})

module.exports = connection

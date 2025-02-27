//funcao para cadastrar carro
async function cadastrarCarro(event) {
    event.preventDefault()

    const motorista = document.getElementById('motorista').value
    const placa = document.getElementById('placa').value
    const senha = document.getElementById('senha').value

    const data = {placa, motorista, senha}

    const response = await fetch('http://localhost:3025/carro/cadastrar', {
        method: "POST", 
        headers: {
            "Content-type": "application/json"
        }, 
        body: JSON.stringify(data)
    })

    const results = await response.json()
    if(results.success) {
        window.location.href = 'login.html'
    } else{
        console.log('houve um erro')
    }
}

//função para logar o carro
async function logarCarro(event) {
    event.preventDefault();

    const placa = document.getElementById('placa').value;
    const senha = document.getElementById('senha').value;

    const data = { placa, senha };
    const response = await fetch('http://localhost:3025/carro/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const results = await response.json(); 

    if (results.success) {
        let carroData = results.data;
        localStorage.setItem('informacoes', JSON.stringify(carroData))
        window.location.href = './homepage.html'; 
    } else {
        alert('Email ou senha incorretos')
    }
}
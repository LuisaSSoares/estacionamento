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
        window.location.href = 'index.html'
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

//função para trocar a cor da vaga quando selecionada
document.querySelectorAll('.vaga').forEach(botao => {
    botao.addEventListener('click', function(event) {
        event.preventDefault()
        document.querySelectorAll('.vaga').forEach(b => b.classList.remove('selecionada'))
        this.classList.add('selecionada')
        document.getElementById("botaoSelecionarVaga").textContent = 'Selecionar'
    });
});

//Função para identificar vaga ocupada
document.getElementById("botaoSelecionarVaga").addEventListener('click', function(event) {
    event.preventDefault();
    const vagaSelecionada = document.querySelector('.vaga.selecionada')
    const botaoSelecionarVaga = document.getElementById("botaoSelecionarVaga")
    const carroData = JSON.parse(localStorage.getItem('informacoes'));
    console.log(carroData)

    if (vagaSelecionada) {
        vagaSelecionada.style.backgroundColor = 'gray'
        botaoSelecionarVaga.textContent = "Confirmar chegada"

     if(vagaSelecionada.textContent === "Confirmar chegada") {
        fetch(`http://localhost:3025/vaga/editar`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ocupado: true,
                carro_id: carroData.id
            }) 
        })
        .then(response => response.json())
        .then(results =>{
            if(results.success) {
                botaoSelecionarVaga.textContent = "Vaga Ocupada"
                botaoSelecionarVaga.disabled = true
                alert('Vaga Ocupada com sucesso')
            }
        })
    }  
} 
});
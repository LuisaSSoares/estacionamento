//Verifica se infos.html foi recuperada para listar os IDs dos carros e suas vagas
document.addEventListener("DOMContentLoaded", function(){
    if(window.location.pathname.includes('infos.html')) {
        listarVagasOcupadas()
    }
    if(window.location.pathname.includes('homepage.html')){
        let carroData = JSON.parse(localStorage.getItem('informacoes'))
        if (carroData && carroData.perfil === 'admin') {
            const linkInfos = document.getElementById('linkInfos')
            linkInfos.classList.remove('hidden')
        }
    }   if(window.location.pathname.includes('carros.html')) {
        listarCarros()
    }
}) 

//Função para cadastrar carro
async function cadastrarCarro(event) {
    event.preventDefault()

    const motorista = document.getElementById('motorista').value
    const placa = document.getElementById('placa').value
    const senha = document.getElementById('senha').value

    if(!motorista || !placa || !senha) {
        alert('preencha todos os campos')
        return
    }

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
        alert('Cadastro feito com sucesso!')
        window.location.href = 'index.html'
    } else{
        alert('Houve um erro durante o cadastro. Tente novamente ou faça o login')
    }
}

//Função para logar o carro
async function logarCarro(event) {
    event.preventDefault();

    const placa = document.getElementById('placa').value;
    const senha = document.getElementById('senha').value;

    if(!placa || !senha) {
        alert('preencha todos os campos')
        return
    }

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
        if (carroData && carroData.perfil === 'admin') {
            window.location.href = './infos.html'
        } else{
            window.location.href = './homepage.html'; 
        } 
        
    } else {
        alert('Email ou senha incorretos')
    }
}

//Função para trocar a cor da vaga quando selecionada
document.querySelectorAll('.vaga').forEach(botao => { //Seleciona todas as vagas
    botao.addEventListener('click', function(event) {
        event.preventDefault()
        const selecionado = document.querySelector('.vaga.selecionada') //Remove seleção da vaga anterior
        if(selecionado) {
            selecionado.classList.remove('selecionada')
        }
        botao.classList.add('selecionada') //Adiciona essa classe ao botão clicado
        document.getElementById("botaoSelecionarVaga").textContent = 'Confirmar vaga'
    });
});

//Função para identificar vaga ocupada
document.getElementById("botaoSelecionarVaga").addEventListener('click', function(event) {
    event.preventDefault();
    const vagaSelecionada = document.querySelector('.vaga.selecionada')
    const botaoSelecionarVaga = document.getElementById("botaoSelecionarVaga")
    const carroData = JSON.parse(localStorage.getItem('informacoes')); //Recupera infos do carro
    const estacionamentoH3 = document.getElementById('estacionamentoH3')
    console.log(carroData)
    console.log(vagaSelecionada)

    if (vagaSelecionada) {
        vagaSelecionada.style.backgroundColor = 'gray'
        fetch('http://localhost:3025/vaga/editar', {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ocupado: true,
                carro_id: carroData.id,
                identificador: vagaSelecionada.getAttribute('data-identificador')
            })
        })
        .then(response => response.json())
        .then(results =>{
            if(results.success) {
                botaoSelecionarVaga.textContent = "Vaga Ocupada"
                botaoSelecionarVaga.disabled = true
                estacionamentoH3.classList.add('hidden')
                alert('Vaga ocupada com sucesso')

            }
        })
} 
});

//Função para listar vagas ocupadas e IDs dos carros
async function listarVagasOcupadas() {
    const response = await fetch ('http://localhost:3025/vagas')
    const tabela = document.getElementById('tabelaCarros')
    const results = await response.json() 
    results.data.forEach(element => {
        const row = document.createElement('tr')
        //refatorando o null do preferencial para 'não'
        if(element.tipo_pref == null){
            element.tipo_pref = 'não'
        }
        row.innerHTML = `
        <td>${element.identificador}</td> 
        <td>${element.tipo_vaga}</td> 
        <td>${element.tipo_pref}</td> 
        <td>${element.carro_id}</td> 

        <td>
            <button onclick="desocuparVaga('${element.identificador}')" class='deletarBtn'>Desocupar</button>
        </td>
        `
        tabela.appendChild(row)    
    });
}

//Função para desocupar vaga
async function desocuparVaga(identificador, linha) {
    const response = await fetch ('http://localhost:3025/vaga/editar', {
        method: 'PUT', 
        headers: {
            "Content-type": "application/json"
        }, 
        body: JSON.stringify({
            ocupado: false,
            carro_id: null,
            identificador: identificador
        })
    })
    
    const results = await response.json()
    if(results.success) {
        linha.remove()
        
    }
}

//Função para listar os carros cadastrados
async function listarCarros() {
    const response = await fetch ('http://localhost:3025/carros')
    const tabela = document.getElementById('tabelaCarros')
    const results = await response.json() 
    results.data.forEach(element => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${element.id}</td> 
        <td>${element.placa}</td> 
        <td>${element.motorista}</td> 

        <td>
            <button onclick="excluirCarro('${element.id}')" class='deletarBtn'>Excluir</button>
            <button onclick="editarCarro('${element.id}')" class='editarBtn'>Editar</button>
        </td>
        `
        tabela.appendChild(row)    
    });
}


//Função para excluir carros 
async function excluirCarro(id) {
    const response = await fetch(`http://localhost:3025/carro/deletar/${id}`, {
        method: 'DELETE'
    })
    const results = await response.json()
    if (results.success) {
        alert('Carro removido com sucesso!');
    }
    listarCarros()
}

//Função para editar carros
async function editarCarro(id) {
    const placa = prompt('Nova placa:')
    const motorista = prompt('Novo motorista:')

     const response = await fetch(`http://localhost:3025/carro/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({placa, motorista})
        
    })
    const results = await response.json()
    if (results.sucess) {
        alert('Carro atualizado com sucesso!');
        document.getElementById('tabelaCarros').innerHTML = ''; 
    }
    listarCarros();
}
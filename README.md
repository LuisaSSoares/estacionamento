# estacionamento
Documentação do sistema de estacionamento: 

<!-- TELA DE LOGIN:  -->
A tela de login (index.html) é a primeira que o usuário irá visualizar. Há dois campos de imput para informar sua placa e senha, além do botão de confirmação "Fazer Login". Caso ele não tiver um cadastro dentro do sistema, ele poderá realizá-lo clicando no link "Faça seu cadastro".Ainda nessa página, algumas condições foram estabelecidas para melhorar a experiência do usuário. Quando ele clica no botão para relizar o login sem nenhuma informação em qualquer um dos campos de imput, é retornado um alert dizendo para preencher todos os campos, ou também, se ele preencher os inputs com informações incorretas, um alert informa que e-mail ou senha estão incorretos. Quando o login é bem sucedido, se o perfil do usuário for apenas um motorista, ele é redirecionado para a tela de vagas (homepage.html), mas se o perfil for um admin, é redirecionado para a página de lista das vagas ocupadas (infos.html).

<!-- TELA DE CADASTRO:  -->
A tela de cadastro (cadastro.html) possui três campos de inputs para que o usuário informe seu nome, placa e senha, além do botão de confirmação. Caso ele preencha seus dados com infomações que já existem no banco de dados, há um alert dizendo que houve um erro, ou também, se deixar alguns desses campos vazios, há a mensagem para preencher todos os campos como na tela de login. Quando o usuário realizar seu cadastro, há o alert avisando que o cadastro foi feito com sucesso e ele será redirecionado para a página de login.

<!-- TELA DE VAGAS:  -->
A tela de vagas (homepage.html) contém tanto vagas padrão quanto preferenciais, de A ao E e de 1 a 8, além de um botão chamado "Clique em uma vaga", que não é funcional no momento que não há nenhuma vaga selecionada. Ao clicar em uma vaga, a vaga fica verde, mostrando que está sendo selecionada, e o botão "Clique em uma vaga" passa a ser "Confirmar". Ao clicar nesse botão novamente, o a vaga fica cinza e o botão "Confirmar" passa a ser "Vaga Ocupada" e ele fica desabilitado. Caso o usuário seleionar outra vaga, o botão altera novamente para "Clique em uma vaga", mas ainda permanece desabilitado. Se o perfil do usuário for um admin, ao acessar essa tela, há dois links: 

<!-- TELA DE LISTAGEM DAS VAGAS OCUPADAS:  -->
A tela de listagem das vagas ocupadas (infos.html) é acessada apenas pelo admin. Ela recupera alguns valores do banco de dados, na tabela de vagas. As informações recuperadas são: identificador da vaga (A1, A2, A3..), o tipo de vaga (preferencial ou padrão), o tipo de vaga preferencial (gestante, idoso ou cadeirante, mas se for uma vaga padrão, o valor é nulo, mas na página é retornado como 'não') e o id do motorista. Ao lado, há o botão de desocu

<!-- TELA DE LISTAGEM DOS USUÁRIOS CADASTRADOS:  -->

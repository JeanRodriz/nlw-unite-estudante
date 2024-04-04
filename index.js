let participantes = [
  {
    nome: "Jean Rodrigo",
    email: "jean_rodrigo@gmail.com",
    dataInscriçao: new Date(2024, 3, 05, 19, 23),
    dataCheckIn: new Date(2024, 12, 04, 20, 20)
  },
  {
    nome: "Ivone Rodrigo",
    email: "ivone_rodrigo@gmail.com",
    dataInscriçao: new Date(2024, 6, 13, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "jack santos",
    email: "jacksantos@gmail.com",
    dataInscriçao: new Date(2024, 10, 01, 19, 23),
    dataCheckIn: new Date(2024, 8, 01, 20, 20)
  },
  {
    nome: "leticia morais",
    email: "leticia_morais@hotmail.com",
    dataInscriçao: new Date(2024, 12, 01, 19, 23),
    dataCheckIn: new Date(2024, 5, 01, 20, 20)
  },
  {
    nome: "john reis",
    email: "john.reis21@gmail.com",
    dataInscriçao: new Date(2024, 8, 01, 19, 23),
    dataCheckIn: new Date(2024, 1, 01, 20, 20)
  },
  {
    nome: "lais da silva",
    email: "laissilva6@gmail.com",
    dataInscriçao: new Date(2024, 2, 01, 19, 23),
    dataCheckIn: new Date(2024, 4, 01, 20, 20)
  },
  {
    nome: "meg rodrigues",
    email: "megrodrigues.21@hotmail.com",
    dataInscriçao: new Date(2024, 1, 01, 19, 23),
    dataCheckIn: new Date(2024, 7, 01, 20, 20)
  },
  {
    nome: "valeria castanha",
    email: "valeriacastanhasantos@gmail.com",
    dataInscriçao: new Date(2024, 7, 01, 19, 23),
    dataCheckIn: new Date(2024, 3, 01, 20, 20)
  },
  {
    nome: "angelica da silva",
    email: "angelica.da.silva@gmail.com",
    dataInscriçao: new Date(2024, 6, 01, 19, 23),
    dataCheckIn: new Date(2024, 9, 01, 20, 20)
  },
  {
    nome: "sandra munhois",
    email: "sandrinha.mun@hotmail.com",
    dataInscriçao: new Date(2024, 8, 01, 19, 23),
    dataCheckIn: new Date(2024, 11, 01, 20, 20)
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscriçao = dayjs(Date.now()).to(participante.dataInscriçao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
    >
    confirmar check-in
    </button>
    `

  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscriçao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
   // estrutura de repetiçao
   for(let participante of participantes) {
    // Faça algo
    output = output + criarNovoParticipante(participante)
   }
   //substituir informaçao do HTML
  document.querySelector('tbody').innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscriçao: new Date(),
    dataCheckIn: null
  }
  
  // verificar se o participante existe
   const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
   })
  
  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }


  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
   
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer fazer checkin
  const mensagemConfirmaçao = 'Tem certeza que gostaria de fazer o check-in?'

  if(confirm(mensagemConfirmaçao) == false) {
    return
  }
  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participantes
  atualizarLista(participantes)
}

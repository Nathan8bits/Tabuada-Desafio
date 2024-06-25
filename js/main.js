import { Questao } from './Questao.js'

//** CRONOMETRO **/
var segundos = 0
var cronometro = document.querySelector('#cronometro')
var iniciarT = false

/** QUESTAO **/
var q = new Questao()
var questoes = document.createElement("div")
questoes.style.display = "none"

var resposta = document.createElement("input")
resposta.setAttribute("class", "number")
resposta.setAttribute("type", "number")

var btnOkResposta = document.createElement("button")
btnOkResposta.setAttribute("class", "btnResposta")
var contResposta = 1
/** -----  */

/**  INTRO  */
var body = document.querySelector("body")
var intro = document.querySelector("#intro")
var min = document.querySelector('#min')
var max = document.querySelector('#max')
let qnt = document.querySelector('#quantidade')
qnt.setAttribute('tabindex', '1')
let btnOkIntro = document.querySelector('#ok')
/** ----- */

btnOkResposta.addEventListener('click', function () {
    var texto = document.createTextNode(`${resposta.value}`)

    q.resposta = resposta.value
    q.objeto.appendChild(texto)

    if (q.verificarResposta()) {
        q.objeto.style.backgroundColor = "green"
    } else {
        q.objeto.style.backgroundColor = "red"
    }

    if (contResposta < qnt.value) {
        gerarQuestao()
    } else if (contResposta == qnt.value) {
        iniciarT = false
        resposta.style.display = "none"
        btnOkResposta.innerHTML = "Reiniciar"
    } else if (contResposta >= qnt.value) {
        contResposta = 0

        //apagando as respostas e fazendo aparecer a introdução novamente
        resposta.value = 0
        intro.style.display = "inline-block"
        resposta.style.display = "inline-flex"
        questoes.remove()
        window.location.reload(true);
    }
    console.log("contResposta: ", contResposta)

    contResposta++
})

btnOkIntro.addEventListener('click', function () {
    iniciarT = true
    
    if (min.value != 0 && max.value != 0 && qnt.value != 0) {//verifiando se os valores digitados sao diferentes de zero

        if (min.value > max.value) {//verificando se o intervalo esta correto: o 1o numero deve menor q o 2o
            min.value = max.value - 1//reduzindo automaticamete o 1o valor
            alert("digite um número menor para o segundo valor")
        } else {
            intro.style.display = 'none'//apaga a intro

            questoes.style.display = "inline-flex"//fazendo sumir a questao
            questoes.setAttribute('class', 'containerQuestoes')//adicionando class de estilo
            questoes.setAttribute('id', 'questoes')//adicionando id

            console.log("contResposta: ", contResposta)
            gerarQuestao()
        }
    } else {//se os valores digitados forem todos iguais a zero
        alert("Digite um valor diferente de zero para todos os campos.")
    }
})

function gerarQuestao() {
    //gerando dois numeros aleatorios entre o min e o max
    q.n1 = numAleatorio(parseInt(max.value), parseInt(min.value))
    q.n2 = numAleatorio(parseInt(max.value), parseInt(min.value))

    //tornando o btnOkREsposta
    btnOkResposta.innerHTML = "OK"
    btnOkResposta.style.display = "inline-block"

    //criando um paragrafo
    var paragrafo = document.createElement("p")
    paragrafo.setAttribute("class", "questao")
    q.objeto = paragrafo //o objeto q recebe o elementoHTMl paragrafo

    resposta.value = 0

    var texto = document.createTextNode(`${q.n1} x ${q.n2} = `) //criando o texto q contem a pergunta. ex: 2 x 1 =

    paragrafo.appendChild(texto)//adicionando o texto no paragrafo criado anteriormente
    paragrafo.appendChild(resposta)//adicionando o input resposta ao paragrafo
    questoes.appendChild(paragrafo)//adicionando o paragrafo na div questoes
    questoes.appendChild(btnOkResposta)//btnOkResposta adiconado a div questoes
    body.appendChild(questoes)//adicionando a div questoes no body
}

function numAleatorio(max, min) {
    return Math.floor((Math.random() * (max - min)) + min)
    //n sei como isso funciona. 
    //Deveria ser:
    //return Math.floor((Math.random() / (max - min)) + min). obs'/' e nao '*'
    //obs: '+ min' eh pra que o numero gerado seja maior ou igual ao min
    //obs: '(max - min)' eh o tamanho do intervalo. 
    //ex: entre 1 e 10 o tamanho do intervalo entre esses numero eh 9
}

function ContarSegundos(){
    if(iniciarT) {//verificando se iniciarT eh true
        segundos++
    }

    let minutos = 0
    if(segundos >= 60) {
        minutos = segundos - (segundos%60)
        minutos = minutos/60
    }

    cronometro.innerHTML = `${minutos}' ${segundos%60}"`//converção de segundos pra minutos e segundos
}
setInterval(ContarSegundos, 1000);
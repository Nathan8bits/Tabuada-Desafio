import {Questao} from './Questao.js'
var q = new Questao()

var body = document.querySelector("body")

var questoes = document.createElement("div")
    questoes.style.display = "none"

var resposta = document.createElement("input")
    resposta.setAttribute("class", "number")
    resposta.setAttribute("type", "number")

var btnOkResposta = document.createElement("button")
    btnOkResposta.setAttribute("class", "btnResposta")
var contResposta = 0

var intro = document.querySelector("#intro")

var min = document.querySelector('#min')
var max = document.querySelector('#max')

let qnt = document.querySelector('#quantidade')
qnt.setAttribute('tabindex', '1')
let btnOkIntro = document.querySelector('#ok')




btnOkResposta.addEventListener('click', function ()
    {        
        var texto = document.createTextNode(`${resposta.value}`)
        
        q.resposta = resposta.value
        q.objeto.appendChild(texto)
        
        if(q.verificarResposta()) {
            q.objeto.style.backgroundColor = "green"
        } else {
            q.objeto.style.backgroundColor = "red"
        }

        if(contResposta < qnt.value ) {
    
            gerarQuestao()
        } else if(contResposta == qnt.value) {
            resposta.style.display = "none"
            btnOkResposta.innerHTML = "Reiniciar"
            contResposta = 0
            resposta.value = 0

        } else if(contResposta >= qnt.value) {
            contResposta = 0
            resposta.value = 0
            
            intro.style.display = "inline-block"
            resposta.style.display = "inline-flex"
            questoes.remove()
            //document.getElementsByClassName('questao').remove()
        }

        console.log(contResposta)
        
        //contResposta++
        
        /*
        var texto = document.createTextNode(`${resposta.value}`)
        contResposta++
        
        q.resposta = parseInt(resposta.value)
        q.objeto.appendChild(texto)
        
        if(q.verificarResposta()) {
            q.objeto.style.backgroundColor = "green"
        } else {
            q.objeto.style.backgroundColor = "red"
        }
        
        if(contResposta == (qnt.value - 1)) {
            btnOkResposta.innerHTML = "Reiniciar"
        }
        
        if(contResposta < qnt.value) {
            gerarQuestao()
        } else if(contResposta == qnt.value) {
            resposta.style.display = "none"
            //btnOkResposta.style.display = "none"
            //btnOkResposta.style.display = "inline-block"
            btnOkResposta.innerHTML = "Reiniciar"
        }

        */
        
} )

btnOkIntro.addEventListener('click', function (){
    //document.write(`<h1>teste ${qnt.value} ${min.value} ${max.value}</h1>`)
    /*     
        um contador eh incrementado, entra em um condicional se o cont for menor que qnt
        a intro desaparece
        a div questoes fica visivel, display = "inline-box"
        uma funcao que gera as questoes eh chamada adicionando as questoes em na div questoes
    */

    if( min.value != 0 && max.value != 0 && qnt.value != 0) {
        if(min.value < max.value) {
            intro.style.display = 'none'
    
            questoes.style.display = "inline-flex"
            questoes.setAttribute('class', 'container')
            questoes.setAttribute('id', 'questoes')
    
            gerarQuestao()
            //contResposta++
        } else {
            min.value = max.value - 1
            alert("digite um número menor para o segundo valor")
        }
    } else {
     
        alert("Digite um valor diferente de zero para todos os campos.")
       /*
       setTimeout(function () {
           document.getElementById("avisoValidacao").remove();
       }, 5000);
        //document.getElementById("avisoValidacao").remove();
        var aviso = document.createElement("p")
        aviso.setAttribute('id', 'avisoValidacao')
        var texto = document.createTextNode("Digite um valor diferente de zero para todos os campos.")
        aviso.appendChild(texto)
        intro.appendChild(aviso)
        */
    }

})

function gerarQuestao() {    
    q.n1 = numAleatorio(parseInt(max.value), parseInt(min.value))
    q.n2 = numAleatorio(parseInt(max.value), parseInt(min.value))

    btnOkResposta.innerHTML = "OK"
    btnOkResposta.style.display = "inline-block"

    var paragrafo = document.createElement("p")
    paragrafo.setAttribute("class", "questao")
    q.objeto = paragrafo

    resposta.value = 0

    var texto = document.createTextNode(`${q.n1} x ${q.n2} = `)

    paragrafo.appendChild(texto)
    paragrafo.appendChild(resposta)
    questoes.appendChild(paragrafo)
    questoes.appendChild(btnOkResposta)
    body.appendChild(questoes)

    contResposta++
}

function numAleatorio(max, min) {
    return Math.floor((Math.random() / (max-min)) + min)
}
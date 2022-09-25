import {key} from './key.js';

let list=[];
let n="";
let s="";
let t="";
let e="";
let sn="";

//--------Identificar o valor do input, armazenar no array dados e colocar no array list--------//

function atualizarDados(){

  n=document.getElementById('nome').value
  s=document.getElementById('sobrenome').value
  d=document.getElementById('data').value
  t=document.getElementById('telefone').value
  e=document.getElementById('email').value
  sn=document.getElementById('senhaCadastro').value

  const dados=[n,s,d,t,e,sn];
  list.push(dados);
}

//--------Função assincrona. Busca os dados--------//
async function conectarDados(url, callback){

  await fetch(url)
  .then(dados => {return dados.json();})
  .then(response => { callback(response)
  });

}


//--------Entrada de dados pelo form de cadastro e envio para a api--------//
function entrada() {

  atualizarDados()

    let urlCadastro="https://www.brunosantuz.com/doc_api/API/registration.php?key="+key+"&method=post&name="+n+"&lastname="+s+"&date="+JSON.stringify(d)+"&email="+e+"&phone="+t+"&password="+sn
    conectarDados(urlCadastro, (response)=>{
      alert("Cadastro concluído!")
      console.log(response);
      if(response.data.status=='200 ok'){
        location.reload()
      }
    })

}


//-------------------Revelar senha---------------------//

function aoIniciar(){

  let input = document.querySelector('.senha input');
  let input2 = document.querySelector('.senhaCad input');
  let img = document.querySelector('.senha img');
  let img2 = document.querySelector('.senhaCad img');
  let visivel = false;

  img.addEventListener('mousedown', function () {
    visivel = true;
    input.type = 'text';
  });

  window.addEventListener('mouseup', function (e) {
    if (visivel) visivel = !visivel;
    input.type = 'password';
  });

  img2.addEventListener('mousedown', function () {
    visivel = true;
    input2.type = 'text';
  });

  window.addEventListener('mouseup', function (e) {
    if (visivel) visivel = !visivel;
    input2.type = 'password';
  });

  //-------------------Recuperação de senha-----------------//
  let descobrirSenha=document.querySelector('.descobrir');

  descobrirSenha.addEventListener('mousedown', function() {
    alert("Em construção :)")
  });


  //-------------------iniciar com enter-----------------//
  document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
    
        let btn = document.querySelector('#enter');
      
      btn.click();
    
    }
  });

}

//-------------------Compara valor o digitado com o existente cadastrado no servidor------------//
function login(){

    let emailInput=document.querySelector('#emailInput').value
    let senhaInput=document.querySelector('#senhaInput').value

    localStorage.setItem('usuario', JSON.stringify([emailInput, senhaInput]));

  let urlLogin="https://www.brunosantuz.com/doc_api/API/registration.php?key="+key+"&method=get&email="+emailInput+"&password="+senhaInput;

  conectarDados(urlLogin, (response)=>{
     console.log(response.data.erro)
    if(response.data.erro){
      alert('Senha ou email inválido!');
    } else {
      window.location.href = "paginaUsuario.html";
      console.log("entrooooooou")
    }
  })

}


//-------Resgata os dados do servidor e exibe na página do usuário. Se o envio for vazio, ele retorna ao index -------//
function dadosUsuario(){

  let usuario=JSON.parse(localStorage.getItem('usuario'))
  let urlInfo="https://www.brunosantuz.com/doc_api/API/registration.php?key="+key+"&method=get&email="+usuario[0]+"&password="+usuario[1]

  conectarDados(urlInfo, (response)=>{
     console.log(response.data)

     if(response.data.erro){
      window.location.href = "index.html";
    } else {
      let nomeUsuario=document.querySelector('#nUsuario')
      nomeUsuario.innerHTML=response.data.nome+" "+response.data.sobrenome;
      let dataUsuario=document.querySelector('#dUsuario')
      dataUsuario.innerHTML=response.data.data_nascimento;
      let celularUsuario=document.querySelector('#cUsuario')
      celularUsuario.innerHTML=response.data.celular;
      let emailUsuario=document.querySelector('#eUsuario')
      emailUsuario.innerHTML=response.data.email;
    
     nomeInicial(response.data.nome)
    }
  })

}



//------------Personaliza a página com o nome do usuário-----------//
function nomeInicial(nome) {

  let nomeUsuario = document.querySelector('#nomeInicial');

  nomeUsuario.innerHTML=nome
}


function aoIniciarUsuario(){

    //------------Mensagem de saída de página-----------//

    let sair=document.querySelector('#sair');

    sair.addEventListener('mousedown', function() {
      alert("Até a próxima! :)")
      window.location.href = "index.html";
    });
    
     //------------Deletar a conta-----------//
      let deletar=document.querySelector('#deletar');
    
    deletar.addEventListener('mousedown', function() {
      let usuario=JSON.parse(localStorage.getItem('usuario'))
      let deletarContaServidor="https://www.brunosantuz.com/doc_api/API/registration.php?key="+key+"&method=delete&email="+usuario[0]
    
      conectarDados(deletarContaServidor, (response)=>{
        if(response.data.status=="200 ok"){
          alert('Conta apagada com sucesso!')
          window.location.href = "index.html";
        } else {
          alert('Não foi possível apagar conta')
        }
      })
    });
    dadosUsuario()
}

if(document.querySelector("#index")){
  addEventListener("load", ()=>{aoIniciar()})
} else{
  addEventListener("load", ()=>{aoIniciarUsuario()})
}
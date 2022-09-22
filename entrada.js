
var list=[];
var n="";
var d="";
var t="";
var e="";
var sn="";

function atualizarDados(){

  n=document.getElementById('nome').value
  d=document.getElementById('data').value
  t=document.getElementById('telefone').value
  e=document.getElementById('email').value
  sn=document.getElementById('senhaCadastro').value
}
//--------Entrada de dados pelo form de cadastro--------//
function entrada() {

  atualizarDados()

    let dados=[n,d,t,e,sn];
    list.push(dados);
 
    localStorage.setItem('usuario', JSON.stringify(dados));


    console.log(dados)
    alert("Cadastro concluído!")
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

}


//---------------Pegar as info do localStorage-----------//
function getDados(){
    return JSON.parse(localStorage.getItem('usuario'))

}

//-------------------Login-----------------//
function login(){

  let local=getDados()

    let emailCadastro=local[3]
    let senhaCadastro=local[4]
    let emailImput=document.querySelector('#emailImput').value
    let senhaImput=document.querySelector('#senhaImput').value

    if (emailImput==emailCadastro && senhaImput==senhaCadastro){
      window.location.href = "paginaUsuario.html";
    }else {
      alert('Dados incorretos!')
    }

}


//-----------Exibir na pág do usuário os dados -------------//
function dadosUsuario(){

  list=getDados()
  
  let info=document.querySelector('#dados')
  let nUsuario=document.querySelector('#nUsuario')
  nUsuario.innerHTML=list[0]
  let dUsuario=document.querySelector('#dUsuario')
  dUsuario.innerHTML=list[1]
  let cUsuario=document.querySelector('#cUsuario')
  cUsuario.innerHTML=list[2]
  let eUsuario=document.querySelector('#eUsuario')
  eUsuario.innerHTML=list[3]

  nomeInicial()
}

//------------Personalizar a página com o nome do usuário-----------//
function nomeInicial() {
  local=getDados()
  let nomeU=local
  let nomeUsuario = document.querySelector('#nomeInicial')

  nomeUsuario.innerHTML=local[0]
}



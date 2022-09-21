var list=[];
var nome='';


function entrada() {
    
    let n=document.getElementById('nome').value
    let s=document.getElementById('sobrenome').value
    let d=document.getElementById('data').value
    let t=document.getElementById('telefone').value
    let e=document.getElementById('email').value
    let sn=document.getElementById('senha').value
    
    let dados=[n,s,d,t,e,sn]
    list.push(dados)

    return 
}



var input = document.querySelector('#senha input');
var img = document.querySelector('#senha img');
var img2 = document.querySelector('#fechado');
var visivel = false;

img.addEventListener('mousedown', function () {
  visivel = true;
  input.type = 'text';
});

window.addEventListener('mouseup', function (e) {
  if (visivel) visivel = !visivel;
  input.type = 'password';
});
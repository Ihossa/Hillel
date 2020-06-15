 'use strick'

function showCard(){
let arr = localStorage.filmsInfo?localStorage.filmsInfo:[];
  if(arr.length > 0){
     fetch('./card.html')
    .then(res => res.text())
    .then(date => {
    let tpl = date;
    let films = '';
    for(let i = 0; i<JSON.parse(localStorage.filmsInfo).length; i++){
    let inf = JSON.parse(localStorage.filmsInfo)[i];
    films += (template(inf, tpl));
    }
    document.querySelector('#content').innerHTML = films; 
    });
  }
} 
showCard();





document.querySelector("#content").addEventListener('click', function(e){
  console.dir(document.querySelector("#content"));
  })
  fetch('./add-new.html')
  .then(res => res.text())
  .then(date => {
    document.body.innerHTML += date;
    let post ="";
    document.querySelector('#upload-poster').addEventListener("change", function previewFile() {
      var file    = document.querySelector('#upload-poster').files[0];
      var reader  = new FileReader();
      reader.onloadend = function () {
        post = reader.result;
        console.log(post);
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }

    })
document.querySelector('#plus').addEventListener('click', (e) => {
  let newCode = e.target.closest("#plus").offsetParent.parentElement.nextElementSibling.parentElement.lastElementChild.outerHTML;
  let newPole = document.createElement('div');
  newPole.innerHTML = newCode;
  newPole = newPole.children[0];
  document.querySelector('#newPole').parentElement.append(newPole);
  console.dir(newPole);
  console.dir(e.target.closest("#plus").offsetParent.parentElement.nextElementSibling);
  document.querySelectorAll('#minus').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.target.closest("#minus").offsetParent.parentElement.outerHTML = "";
  })


})
})
document.querySelectorAll('#minus').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.target.closest("#minus").offsetParent.parentElement.outerHTML = "";
  })
  //console.dir(e.target.closest("#minus").offsetParent);
  //e.target.closest("#minus").offsetParent.parentElement.outerHTML = "";

})
document.querySelector('#saveFilm').addEventListener('click', () => {
let saveInfo = localStorage.filmsInfo?JSON.parse(localStorage.filmsInfo):[];
let arrPos = [];
let arrPro = [];
document.querySelectorAll('.position').forEach((e)=>arrPos.push(e.value));
document.querySelectorAll('.idProd').forEach((e)=>arrPro.push(e.value));
console.log(arrPos);
let filmInfo = {

    filmId: Date.now(),
    filmTitle: document.querySelector('#filmTitle').value,
    originFilmTiile: document.querySelector('#originFilmTiile').value,
    poster: post,
    year: document.querySelector('#year').value,
    coutry: document.querySelector('#coutry').value,
    slogan: document.querySelector('#slogan').value,
    producer: document.querySelector('#producer').value,
    actres: document.querySelector('#actres').value,
    raiting: document.querySelector('#raiting').value,
    description: document.querySelector('#description').value,
  }
  for(let = i; i>arrPos.length; i++ ){
    filmInfo[`idProd${i}`] = document.querySelectorAll('.idProd')[i]
  }
  for(let = i; i>arrPos.length; i++ ){
    filmInfo[`position${i}`] = document.querySelectorAll('.position')[i]
  }
  saveInfo.push(filmInfo);
  localStorage.filmsInfo = JSON.stringify(saveInfo);
  document.querySelector('.w-75').reset();
  showCard();
  })
})

window.addEventListener("load", function() {
  if(localStorage.filmsInfo !== ""){
  let films = document.querySelector("#content").addEventListener('click', (e) => {
    let filmId = e.target.closest(".card-footer").id;
    let blockFilm = e.target.closest(".card");    
     if(e.target.closest("#delete").id === 'delete'){
      let arr = localStorage.filmsInfo;
      console.log(arr);
      arr = (JSON.parse(arr));
      for(let i = 0; i<arr.length; i++){
        if(arr[i].filmId === Number(filmId)){ 
          arr.splice(i, 1);
          localStorage.filmsInfo = JSON.stringify(arr);
          blockFilm.style.display = "none";
        };
      }
    }
   })
  }
  if(localStorage.filmsInfo !== ""){
  let films = document.querySelector("#content").addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.tagName === "A"){
      window.location.hash = `#list-${e.target.offsetParent.nextElementSibling.id}`;
    } 
    let filmId = e.target.closest(".card-footer").id;
    let blockFilm = e.target.closest(".card");
     if(e.target.closest("#edit").id === 'edit'){
      document.querySelector('.w-75').reset();
       $("#exampleModal").modal("show");
       let arr = localStorage.filmsInfo;
        arr = (JSON.parse(arr));
        for(let i = 0; i<arr.length; i++){

          if(arr[i].filmId === Number(filmId)){
            console.log(arr[i]);
            let arrPos = [];
            let arrPro = [];
            
            document.querySelectorAll('.idProd').forEach((e)=>arrPro.push(e.value));
            document.querySelector('#filmTitle').value = arr[i].filmTitle;
            document.querySelector('#originFilmTiile').value = arr[i].originFilmTiile;
            document.querySelector('#upload-poster').files[0] = arr[i].poster;
            document.querySelector('#year').value = arr[i].year;
            document.querySelector('#coutry').value = arr[i].coutry;
            document.querySelector('#slogan').value = arr[i].slogan;
            document.querySelector('#producer').value = arr[i].producer;
            document.querySelector('#position').value = arr[i].position;
            document.querySelector('#idProd').value = arr[i].idProd;
            document.querySelector('#actres').value = arr[i].actres;
            document.querySelector('#raiting').value = arr[i].raiting;
            document.querySelector('#description').value = arr[i].description;
          }
        }
        document.querySelector('#saveFilm').addEventListener('click', () => {

        let saveInfo = localStorage.filmsInfo?JSON.parse(localStorage.filmsInfo):[];

          localStorage.filmsInfo = JSON.stringify(saveInfo);
          for(let i = 0; i<saveInfo.length; i++){
            console.log(saveInfo[i].filmId);

            if(saveInfo[i].filmId === Number(filmId)){
              saveInfo.splice(i,1);
              blockFilm.style.display = "none";
            }
          } 
          localStorage.filmsInfo = JSON.stringify(saveInfo);
              document.querySelector('.w-75').reset();
              showCard();
          })

    }
   })
  }
});

window.addEventListener("hashchange", (e) => {
  if(e.newURL === 'http://localhost:5000/#list'){
    showCard();
  }else{
   fetch('./movie.html')
   .then(res => res.text())
    .then(date => {
    let tpl = date;
    let arr = JSON.parse(localStorage.filmsInfo);
    let film = '';
    for(let i = 0; i<arr.length; i++){
    if(arr[i].filmId === Number(e.newURL.slice(28))){
    let inf = JSON.parse(localStorage.filmsInfo)[i];
    film += (template(inf, tpl));
    document.querySelector("#content").innerHTML = film;
    }

    }
    
  })
  }
})
console.dir(document.querySelector("#search"));


function template(data, tpl) {
const f = (strings, ...values) => strings.reduce((res, item, index) => {
return index === strings.length - 1 ?
res += `${item}` :
res += `${item}${data[values[index]]}`;
}, '');
return eval('f`' + tpl + '`');
}

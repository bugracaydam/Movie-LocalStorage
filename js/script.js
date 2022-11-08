const film_ekle = document.querySelector(".btnn");
const filmlistesi = document.querySelector(".filmss");
const page = document.querySelector(".banner");
const filmadi = document.querySelector(".text1");
const yonadi = document.querySelector(".text2");
const afislink = document.querySelector(".text3");
const kisaaciklama = document.querySelector(".text4");
const uzunaciklama = document.querySelector(".text5");

document.addEventListener("DOMContentLoaded", localStorageRead);
film_ekle.addEventListener("click", filmekle);

var filmler = [];

window.onload = function () {
  var form = document.getElementById("myForm");
  var pristine = new Pristine(form);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var valid = pristine.validate(); // returns true or false
  });
};

//object oluşturuyoruz
function addItem() {
  var character =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var randomPsw = "";
  for (var i = 0; i < 10; i++) {
    var numPws = Math.floor(Math.random() * character.length);
    randomPsw += character.substring(numPws, numPws + 1);
  }
  return {
    filmadii: filmadi.value,
    yonadii: yonadi.value,
    afislinki: afislink.value,
    kisaacik: kisaaciklama.value,
    uzunacik: uzunaciklama.value,
    id: randomPsw,
  };
}
//localden filmleri çekme
function getFilms() {
  if (localStorage.getItem("filmler") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("filmler"));
  }
}

//film ekle butonuna basıldığında çalışacak fonksiyon
function filmekle(e) {
  let data = addItem();
  localStorageAdd(data);
  filmolustur(data);

  filmadi.value = "";
  yonadi.value = "";
  uzunaciklama.value = "";
  afislink.value = "";
  kisaaciklama.value = "";
  film_ekle.addEventListener("click", filmekle);
}

function localStorageAdd(data) {
  filmler = getFilms();
  filmler.push(data);
  localStorage.setItem("filmler", JSON.stringify(filmler));
}

function localStorageRead() {
  filmler = getFilms();
  filmler.forEach(function (filmler) {
    filmolustur(filmler);
  });
}

function localStorageDelete(id) {
  filmler = getFilms();
  filmler = filmler.filter((item) => {
    return item.id != id;
  });
  localStorage.setItem("filmler", JSON.stringify(filmler));
}

//filmin listelenmek için oluşturulduğu alan
function filmolustur(data) {
  const filmwrapper = document.querySelector(".filmss");
  const film__card = ` <div class="container" data-content="${data.id}">
    <img
      src="${data.afislinki}"
      alt=""
    />
    <ul class="textBox">
      <li>
        <h2>${data.filmadii}</h2>
        <p>
        ${data.kisaacik}
        </p>
        <a class="readmore" id="${data.id}" href="#">Read More</a>
      </li>
    </ul>
  </div>`;
  filmwrapper.insertAdjacentHTML("beforeend", film__card);
  const readmore = document.querySelector("#" + data.id);
  readmore.addEventListener("click", function () {
    detailPage(data.id);
  });
}

function detailPage(id) {
  const finder = filmler.find((element) => element.id == id);
  const openpage = document.querySelector(".banner");
  const page = ` <div class="detail">
    <img src="${finder && finder.afislinki}" class="detail__img" alt="" />
    <ul>
      <li><h1 class="detail__h2">${finder && finder.filmadii}</h1></li>
      <li class="detail__yonetmen"><p>${finder && finder.yonadii}</p></li>
      <li class="detail__uzun"><p>${finder && finder.uzunacik}</p></li>
    </ul>
    <a class="detail__sil" href="#">SILMEK</a>
    <a class="detail__kapat" href="#">KAPAT</a>
  </div> `;
  openpage.insertAdjacentHTML("beforeend", page);

  const kapama = document.querySelector(".detail__kapat");
  kapama.addEventListener("click", kapat);
  function kapat() {
    const details = document.querySelector(".detail");
    details.remove();
  }

  const silme = document.querySelector(".detail__sil");
  silme.addEventListener("click", sil);
  function sil() {
    localStorageDelete(id);
    kapat();
    window.location.reload();
  }
}

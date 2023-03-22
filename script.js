const URL = "https://api.tvmaze.com/shows";
const button = document.querySelector("button");
const main = document.querySelector("main");
const input = document.querySelector("input");

const req = new XMLHttpRequest();

req.open("GET", URL);

req.send();
req.onload = function () {
  if (req.status >= 200 && req.status < 400) {
    const response = JSON.parse(req.responseText);
    // console.log(response)
    createMovieDiv(response);
  }
};

function createMovieDiv(res) {
  for (let i = 0; i < res.length; i++) {
    if (res[i].rating.average > 8) {
      // console.log(res[i])
      const bestMovieDiv = document.createElement("div");
      bestMovieDiv.classList.add("bestMovie");
      main.appendChild(bestMovieDiv);
      const movieName = document.createElement("p");
      movieName.innerHTML = res[i].name;
      bestMovieDiv.appendChild(movieName);
      const bestMovieImg = document.createElement("img");
      bestMovieImg.setAttribute("src", res[i].image.medium);
      bestMovieDiv.appendChild(bestMovieImg);

      bestMovieDiv.addEventListener("click", () => {
        sessionStorage.setItem("oneMovieInfo", JSON.stringify(res[i]));
        window.location.href = "showInfoPage.html";
      });
    }
  }
}

const searchURL = "https://api.tvmaze.com/search/shows?q=";

input.addEventListener("input", () => {
  req.open("GET", searchURL + input.value);

  req.send();
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      const response = JSON.parse(req.responseText);
      //   console.log(response);
      createSearchList(response);
    }
  };
});

function createSearchList(lista) {
  const header = document.querySelector("header");
  const listDiv = document.createElement("div");
  listDiv.classList.add("listDivClass");
  header.appendChild(listDiv);

  window.addEventListener("click", () => {
    listDiv.innerHTML = "";
    input.value = "";
  });
  for (let i = 0; i < lista.length; i++) {
    const listItems = document.createElement("p");
    listItems.innerHTML = lista[i].show.name;
    listDiv.appendChild(listItems);
  }
  button.addEventListener("click", () => {
    console.log(lista[0].show);
    sessionStorage.setItem("oneMovieInfo", JSON.stringify(lista[0].show));
    window.location.href = "showInfoPage.html";
  });
}

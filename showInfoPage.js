const movieInfo = JSON.parse(sessionStorage.getItem("oneMovieInfo"))

console.log(movieInfo)

const oneMovie = document.querySelector(".oneMovie")
const movieDiv = document.createElement("div")
oneMovie.appendChild(movieDiv)
const main=document.querySelector("main")
const movieImg = document.createElement("img")

movieImg.setAttribute("src",movieInfo.image.original)
main.prepend(movieImg)  

const movieName = document.createElement("h1")
movieName.innerHTML=movieInfo.name
movieDiv.appendChild(movieName)

const genre = document.createElement("ul")
for(let i=0; i<movieInfo.genres.length ;i++){
const genreLi = document.createElement("li")
genreLi.innerHTML=movieInfo.genres[i]
console.log(genreLi)
movieDiv.appendChild(genreLi)
}

const movieRating= document.createElement("p")
movieRating.innerHTML=`Movie rating: ${movieInfo.rating.average}`
movieDiv.appendChild(movieRating)

const URL = "https://api.tvmaze.com/shows/"
const ID = movieInfo.id

const req = new XMLHttpRequest();

req.open("GET",URL+ID+"/seasons");
req.send();
req.onload= function(){
    if (req.status >= 200 && req.status < 400) {
        const seasons = JSON.parse(req.responseText)
        console.log(seasons);
        makeSeasons(seasons);
    }
}
function makeSeasons(sezona){
    const seasonsTitle= document.createElement("h2")
    seasonsTitle.innerHTML= "Seasons:"
    movieDiv.appendChild(seasonsTitle)
    for(let i=0; i<sezona.length-1 ;i++){
        const seasonLi=document.createElement("p")
        seasonLi.innerHTML=`${sezona[i].premiereDate} - ${sezona[i].endDate}`
        movieDiv.appendChild(seasonLi)
    }
}

const req1 = new XMLHttpRequest();

req1.open ("GET", URL + ID + "/cast");
req1.send ();
req1.onload = function () {
    if (req1.status >= 200 && req1.status < 400) {
        const movieCast = JSON.parse (req1.responseText)
        console.log(movieCast)
        makeCast(movieCast)
    }
}

function makeCast (glumci) {
    const castTitle = document.createElement ("h2")
    castTitle.innerHTML = "Cast:"
    movieDiv.appendChild (castTitle)
    for (let i = 0; i < glumci.length; i++) {
        const castLi = document.createElement("p")
        castLi.innerHTML = glumci[i].person.name
        movieDiv.appendChild (castLi)
    }
    
}

const descriptionDiv = document.createElement ("div")
main.append (descriptionDiv)
descriptionDiv.innerHTML = movieInfo.summary

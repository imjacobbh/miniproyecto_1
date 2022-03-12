
const animales = [
    {
        nombre: "Camello",
        imagen: "./images/01 Camello.png",
        sonido: "./sounds/camello.mp3",
        habitat: "./images/01 Desierto.png",
        selected: false
    },
    {
        nombre: "Ardilla",
        imagen: "./images/02 Ardilla.png",
        sonido: "./sounds/ardilla.mp3",
        habitat: "./images/02 Arbol.jpg",
        selected: false
    },
    {
        nombre: "Abeja",
        imagen: "./images/03 Abeja.png",
        sonido: "./sounds/abeja.mp3",
        habitat: "./images/03 Panal.jpg",
        selected: false
    },
    {
        nombre: "Perrito",
        imagen: "./images/04 Perrito.png",
        sonido: "./sounds/perrito.mp3",
        habitat: "./images/04 CASA PERRO.jpg",
        selected: false
    },
    {
        nombre: "Pinguino",
        imagen: "./images/05 Pinguino.png",
        sonido: "./sounds/pinguino.mp3",
        habitat: "./images/05 iglu.jpg",
        selected: false
    },
    {
        nombre: "Jirafa",
        imagen: "./images/06 Jirafa.png",
        sonido: "./sounds/jirafa.mp3",
        habitat: "./images/06 Sabana.png",
        selected: false
    },
    {
        nombre: "Pajaro",
        imagen: "./images/07 Pajaro.png",
        sonido: "./sounds/pajaro.mp3",
        habitat: "./images/07 Nido.png",
        selected: false
    },
    {
        nombre: "Pez",
        imagen: "./images/08 Pez.png",
        sonido: "./sounds/burbujasPez.mp3",
        habitat: "./images/08 Arrecife.png",
        selected: false
    },
    {
        nombre: "Cangrejo",
        imagen: "./images/09 Cangrejo.png",
        sonido: "./sounds/cangrejo.mp3",
        habitat: "./images/09 Playa.png",
        selected: false
    }
]

let correct = 0;
let total = 0;

let totalIntentos = 0;
let totalCorrect = 0;
let totalGame = 6;

const totalDraggableItems = 3;
const totalMatchingPairs = 3; // Debe de ser <= totalDraggableItems

const imagenVictoria= "./images/jirafa.gif";
const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();

function initiateGame() {
    //generamos los animales del tablero
    const randomDraggableAnimals = generateRandomAnimalsArray(totalDraggableItems, animales);
    //desordenamos habitats
    var randomDroppableHabitats = generateRandomHabitatsArray(totalMatchingPairs, randomDraggableAnimals);

    // Agregamos los animales que serán arrastrados a su habitat
    for (let i = 0; i < randomDraggableAnimals.length; i++) {
        draggableItems.insertAdjacentHTML("beforeend", 
        `<div class="col-4 col-md-12 animalss d-flex justify-content-center center" style="background-color: ${random_bg_color()};">
        <img src="${randomDraggableAnimals[i].imagen}" style="width: auto; height: 70%"  class="draggable" draggable = "true" id="${randomDraggableAnimals[i].nombre}"/>
    </div>`);
    }


    // Create "matching-pairs" and append to DOM
    for (let i = 0; i < randomDroppableHabitats.length; i++) {
        matchingPairs.insertAdjacentHTML("beforeend", 
        `<div class=" col-4 text-center matching-pair justify-content-center" style="height: 70%; width: 33%;" draggable = "false" >
        <div class="droppable center" data-animal="${randomDroppableHabitats[i].nombre}"
            style="height: 90%; border-radius: 100%;" draggable = "false" id="${randomDroppableHabitats[i].nombre}1">
        </div>
    </div>`
      );
        let picUrl = "url('" + randomDroppableHabitats[i].habitat + "')"
        document.getElementById(randomDroppableHabitats[i].nombre + "1").style.backgroundImage = picUrl;
        document.getElementById(randomDroppableHabitats[i].nombre + "1").style.backgroundSize = "cover";
        document.getElementById(randomDroppableHabitats[i].nombre + "1").style.backgroundRepeat = "no-repeat";
        document.getElementById(randomDroppableHabitats[i].nombre + "1").style.backgroundPosition = "center";
    }

    draggableElements = document.querySelectorAll(".draggable");
    droppableElements = document.querySelectorAll(".droppable");

    draggableElements.forEach(elem => {
        elem.addEventListener("dragstart", dragStart);
        elem.addEventListener("drag", drag);
        // elem.addEventListener("dragend", dragEnd);
    });

    droppableElements.forEach(elem => {
        elem.addEventListener("dragenter", dragEnter);
        elem.addEventListener("dragover", dragOver);
        elem.addEventListener("dragleave", dragLeave);
        elem.addEventListener("drop", drop);
    });
}

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {

    event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

function drag(event) {

}

//Events fired on the drop target

function dragEnter(event) {
    if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}

function dragOver(event) {
    if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.preventDefault();
    }
}

function dragLeave(event) {
    if (event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");
    const animalName = event.dataTransfer.getData("text");
    const habitat = event.target.getAttribute("data-animal");
    const isCorrectMatching = animalName === habitat;
    total++;
    totalIntentos++;
    const animalObject = animales.find(obj => { return obj.nombre === animalName });
    if (isCorrectMatching) {
        var audio = new Audio(animalObject.sonido);
        audio.play();
        const draggableElement = document.getElementById(animalName);
        event.target.classList.add("dropped");
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        event.target.appendChild(draggableElement);
        event.target.insertAdjacentHTML("afterend", `<span  ondragstart="return false;" ondrop="return false;">${animalObject.nombre}</span>`);
        draggableElement.style.opacity = 1;
        draggableElement.style.height = "auto";
        draggableElement.style.width = "70%";
        correct++;
        totalCorrect++;
    }
    else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
    }
    scoreSection.style.opacity = 0;
    setTimeout(() => {
        correctSpan.textContent = totalCorrect;
        totalSpan.textContent = totalIntentos;
        scoreSection.style.opacity = 1;
    }, 200);
    //si acertó 3, muestra el boton continuar
    if (correct === Math.min(totalMatchingPairs, totalDraggableItems)) { // Game Over!!
        playAgainBtn.style.display = "block";
        setTimeout(() => {
            playAgainBtn.classList.add("play-again-btn-entrance");
        }, 200);
    }
    //si acertó los 6, esconde el boton de continuar y muestra pantalla de felicitación
    if (totalCorrect == totalGame) {
        //GANÓ
        var nombre = localStorage.getItem("nombre");
        playAgainBtn.style.display = "none";
        var audio = new Audio("./sounds/victoria.mp3");
        audio.play();
        Swal.fire({
        title: "FELICIDADES, " + nombre + "!!",
        html: `Has guiado a los animalitos a su habitat, ahora están a salvo <br>
        <img src=${imagenVictoria} style="width: 50%"/>
        `,
        confirmButtonColor: '#CAE600',
        confirmButtonText: "Yei!",
        type: "success",
        backdrop: `
            rgba(255,255,255,0.8)
            url("images/won.gif")
            left top
            
        `}).then(function() {
            
        var records = JSON.parse(localStorage.getItem("records") || "[]")
        var nombre = localStorage.getItem("nombre");
        var record = {nombre: nombre, movimientos:totalIntentos}
        records.push(record);
        records.sort(((a, b) => a.movimientos - b.movimientos));
        let recordsJSON = JSON.stringify(records);
        localStorage.setItem("records", recordsJSON);

        tabla=`<table id="listado"><thead><th>Posición</th> <th>Nombre</th> <th>Movimientos</th></thead>`;
        for(var i in records){
            var position = 1+ parseInt(i,10);
            tabla += `<tr><td>`+ position +`</td>`;
            tabla += `<td>`+records[i].nombre+`</td>`;
            tabla += `<td>`+records[i].movimientos+`</td>`;
            tabla += `</tr>`;
            if( position> 10) break;
        }
        tabla+=`</table>`

        Swal.fire({
            title: "Tabla de posiciones",
            html: tabla,
            confirmButtonColor: '#CAE600',
            confirmButtonText: "Volver a jugar",
            type: "success",
            backdrop: `
            rgba(202,230,0,0.6)
            url("images/perrito.gif")
            left top
            no-repeat
        `,
        }).then(function() {
            //here we will re direct to the screen to congrats the child
            location.href = "index.html";
        });
        console.long(tabla)
        });
    }

}

// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);
function playAgainBtnClick() {
    playAgainBtn.classList.remove("play-again-btn-entrance");
    correct = 0;
    total = 0;
    draggableItems.style.opacity = 0;
    matchingPairs.style.opacity = 0;
    setTimeout(() => {
        scoreSection.style.opacity = 0;
    }, 100);
    setTimeout(() => {
        playAgainBtn.style.display = "none";
        while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
        while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
        initiateGame();
        correctSpan.textContent = totalCorrect;
        totalSpan.textContent = totalIntentos;
        draggableItems.style.opacity = 1;
        matchingPairs.style.opacity = 1;
        scoreSection.style.opacity = 1;
    }, 500);
}

// Auxiliary functions
function generateRandomAnimalsArray(n, originalArray) {
    let res = [], counter = 0;
    while (counter < n) {
        const randomIndex = Math.floor(Math.random() * originalArray.length)
        const rand = originalArray[randomIndex];
        if (!res.some(an => an === rand) && rand.selected == false) {
            res.push(rand);
            counter++;
            originalArray[randomIndex].selected = true;
        }
    }
    return res;
}

function generateRandomHabitatsArray(n, originalArray) {
    let res = [], counter = 0;

    while (counter < n) {
        let rand = originalArray[Math.floor(Math.random() * originalArray.length)];
        if (!res.some(an => an === rand)) {
            res.push(rand);
            counter++;
        }
    }
    return res;
}
function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
    }

function back() {
    location.href = "index.html";
}

function creditos(){
    location.href = "creditos.html";
}

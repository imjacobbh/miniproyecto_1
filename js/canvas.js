var frames = [
    'images/marcof0.png',
    'images/marcof1.png',
    'images/marcof2.png',
    'images/marcof3.png',
    'images/marcof4.png'
];

var direccion = 'arriba';
var index = 0;
var images = new Image();

function animar() {
    setInterval("dibujar()", 200);
    var audio = document.createElement("AUDIO")
    document.body.appendChild(audio);
    audio.src = "./sounds/sonidos animales.ogg"

    document.body.addEventListener("mousemove", function () {
        audio.play()
    })
}

function dibujar() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var logo = new Image();
    logo.src = 'images/logo.png';

    ctx.clearRect(0, 0, 1330, 630); // limpiar canvas

    // Crear gradiente
    var grd = ctx.createRadialGradient(750, 300, 50, 700, 600, 1000);
    grd.addColorStop(0, "#CAE600");
    grd.addColorStop(1, "green");
    //grd.addColorStop(0, "green");
    //grd.addColorStop(1, "#eeeeee");


    // Llenar gradiente
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1500, 700);

    //dibujar frame
    images.src = frames[index];
    ctx.drawImage(images, 0, 0);

    ctx.drawImage(logo, 415, 100, 500, 350);

    //escribir texto
    ctx.font = "bold 30px Berlin Sans FB";
    ctx.fillStyle = '#eeeeee'
    ctx.fillText("Haz click aqui para continuar", 456, 500);



    if (direccion == 'arriba') {
        if (index == frames.length - 1) {
            direccion = 'abajo';
        } else {
            index += 1;
        }
    }
    if (direccion == 'abajo') {
        if (index == 0) {
            direccion = 'arriba';
            index = 1;
        } else {
            index -= 1;
        }
    }

}

function clickMe() {

    Swal.fire({
        title: "Hola, Ingresa tu nombre",
        text: "Para continuar al juego, tu nombre es importante:",
        input: 'text',
        confirmButtonColor: '#CAE600',
        background: "#fff",
        showCancelButton: false,
        inputPlaceholder: "Ingresa tu nombre aquí",
        backdrop: `
            rgba(202,230,0,0.4)
            url("images/perrito.gif")
            left top
            no-repeat
        `,
        inputValidator: (value) => {
            if (!value) {
                return 'Necesitamos tu nombre!'
            }
        }
    }).then((result) => {
        if (result.value === null) return false;

        if (result.value === "") {
            new swal.showInputError("Necesitamos tu nombre!");
            return false
        }
        if (result.value == undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Y tu nombre?',
                text: 'No podrás jugar si no ingresas un nombre!',
                confirmButtonColor: '#CAE600',
                backdrop: `
                rgba(202,230,0,0.6)
                url("images/perritoEnojado.gif")
                center top 
                no-repeat
            `
            })
            return false;
        }
        if (result.value != undefined) {
            nombre = result.value;
            Swal.fire({
                title: "Gracias, " + nombre + "!",
                text: "Procede a divertirte!",
                confirmButtonColor: '#CAE600',
                type: "success",
                backdrop: `
                rgba(202,230,0,0.6)
                url("images/perrito.gif")
                left top
                no-repeat
            `,
            }).then(function() {
                localStorage.setItem('nombre', nombre);
                console.log(nombre);
                location.href = "game.html";
            });
        }
    });
}

window.onload = animar();
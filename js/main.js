const initGame = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8]; // array de imagenes
  const play = document.querySelector("#play"); // boton play
  const init = document.querySelector(".init"); // div init
  const game = document.querySelector(".game"); // div game
  const cards = document.querySelectorAll(".card"); // div card para las imagenes
  const points = document.querySelector(".score-points"); // div score-points para el total de puntos

  let newImages = []; // totdas las imagenes a descubrir
  let usedImages = []; // guardar todas las imagenes ya usadas
  let totalImages = 0;
  let selections = []; // guardar las imagenes seleccionadas por el usuario
  let minPoints = 5000; // minimo de puntos para ganar
  let totalIntents = 0; // totol numero de intentos
  let totalPoints = 0;

  play.addEventListener("click", () => {
    // capturar el evento click del boton play
    init.style.display = "none"; // ocultamos la pantalla init
    game.style.display = "block"; // mostramos la pantalla game
  });

  const randNumber = (arr = []) => {
    return Math.floor(Math.random() * arr.length);
  };

  const generateCards = (images = []) => {
    let r = randNumber(images);
    if (usedImages.indexOf(r) === -1) {
      // valido que el valor de r no este en el array de index utilizados
      usedImages.push(r); // guardo el index en el array de utilizados
      newImages.push(images[r]); // guardo la imagen  que esta en ese indice
      totalImages++;
    }
    if (totalImages < images.length) {
      return generateCards(images);
    }
  };

  for (let i = 0; i < 2; i++) {
    usedImages = [];
    totalImages = 0;
    generateCards(images);
  }

  const assignCards = () => {
    newImages.forEach((image, index) => {
      let img = document.querySelector(`#m${index}`);
      // let img = document.querySelector(`#m0`);
      img.src = "./img/" + image + ".png"; // ./img/1.png
    });
  };
  assignCards();

  cards.forEach((card) => {
    card.addEventListener("click", selectCard);
  });

  const compareSelecions = () => {
    totalIntents++;
    //const img1 = selections[0];
    //const img2 = selections[1];
    const [img1, img2] = selections;
    if (img1.src === img2.src) {
      totalPoints += totalIntents > 8 ? 500 : 1000;
      img1.parentNode.removeEventListener("click", selectCard);
      img2.parentNode.removeEventListener("click", selectCard);
      selections = [];
    } else {
      setTimeout(() => {
        img1.parentNode.classList.remove("active");
        img2.parentNode.classList.remove("active");
        img1.parentNode.addEventListener("click", selectCard);
        img2.parentNode.addEventListener("click", selectCard);
        selections = [];
      }, 500);
    }
  };

  function selectCard(e) {
    const card = e.target;
    if (
      selections.length < 2 &&
      selections.indexOf(card.childNodes[1]) === -1
    ) {
      card.classList.add("active"); // activamos que se vea la imagen
      selections.push(card.childNodes[1]); // guardar la imagen seleccionada
    }
    if (selections.length === 2) {
      compareSelecions();
    }
    points.innerHTML = totalPoints;
  }
};

initGame();

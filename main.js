// uradi html and css kao u orginalu +
// sounds prikazujes dinamicki kroz JS a uzimas ga iz json +
// api call da preuzmes tonove i title i sliku +
// funkcija da dinamicno prikazes na strani +
// current time za resetovanje tona +
// namesti na klik da svaki od njih prikaze odgovarajuci ton +
// svaki ton koji je kliknut nakon klika da promeni boju +
// na stop All svi tonovi odmah prestaju

// bonus keydown event da se na klik keycode dole cuje odgovarajuci zvuk

const soundsElement = document.querySelector('.sounds');
const stopButton = document.querySelector('#stopButton');
const sound = document.querySelectorAll('.sound')
const players = [];

let keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];

getAllSounds()

async function getAllSounds() {

  const res = await fetch('./sounds.json')

  const data = await res.json()

  //console.log(data)

  displaySoundsOnPage(data)


}

function displaySoundsOnPage(sounds) {

  sounds.map(function (sound, index) {

    console.log(sound)

    // sound div

    let div = document.createElement('div')
    div.classList.add('sound')

    //h5
    let h5 = document.createElement('h5')
    h5.classList.add('sound-title')
    h5.textContent = sound.title
    div.appendChild(h5)

    //img
    let img = document.createElement('img')
    img.classList.add('img-sounds')
    img.setAttribute('src', `keys/${keyCodes[index]}.png`)


    // audio
    let audio = document.createElement('audio')
    audio.setAttribute('src', `sounds/${sound.src}`)
    audio.setAttribute('data-id', `${keyCodes[index]}`)
    players.push({
      audio
    })

    //console.log(players[index].audio.src)

    div.appendChild(audio)
    div.appendChild(img)

    soundsElement.appendChild(div)


  })

  document.querySelectorAll('.sound').forEach((data, index) => {

    data.addEventListener('click', () => {


      players[index].audio.play()
      players[index].audio.currentTime = 0
      data.style.backgroundColor = 'lightblue'

    })

  })

}

stopButton.addEventListener('click', stopAll)


function stopAll() {


  let sounds = document.querySelectorAll('.sound')

  sounds.forEach(sound => {

    sound.querySelector('audio').pause()


  })

}
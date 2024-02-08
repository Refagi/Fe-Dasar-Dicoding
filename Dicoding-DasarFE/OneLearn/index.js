const gambar = document.getElementById("gambar")
gambar.setAttribute('width', 300);
gambar.setAttribute('height', 215);


//mengambil elmeent dari nodelist
const buttons = document.querySelectorAll('.button');

//mengambil elemet dinodelist yang array ke 3
const playButton = buttons[3];

//mengambil element yang ada di playButton
const playButtonElement = playButton.children[0];

//mengubah elemenet
playButtonElement.setAttribute('type', 'submit');

// mengambil elemenet id html 
const dicodingOne = document.getElementById('dicodingLink');

//mengubah text 
// dicoding.innerText = 'Belajar Programming di Dicoding';

//mengubah element html
dicodingOne.innerHTML = '<i>Belajar Programming di Dicoding</i>';

const dicodingTwo = document.getElementById('googleLink')
dicodingTwo.innerHTML = '<i>Mencari Sesuatu di Google</i>'

//mengambil class element dan mengubah style nya
const buttonsTwo = document.getElementsByClassName('button');
for (const button of buttonsTwo) {
    button.children[0].style.borderRadius = '6px';
  }



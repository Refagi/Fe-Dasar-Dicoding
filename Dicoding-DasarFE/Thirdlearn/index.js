   //untuk menghapus element hiddden
   function welcome() {
    alert('Sim salabim muncullah elemen-elemen HTML!');
    const contents = document.querySelector('.contents');
    contents.removeAttribute('hidden');
  }
//membuat event onload , ketika pop up di tekan ok, maka hidden dihapus
  // document.body.onload = welcome

  //membuat function yg isinya jika tombol diclick 7 kali, maka akan memunculkan gambar
function increment() {
    document.getElementById('count').innerText++;

    if (document.getElementById('count').innerText == 7) {
        const hiddenMessage = document.createElement('h4');
        hiddenMessage.innerText = 'Selamat! Anda menemukan hadiah tersembunyi...';
        const image = document.createElement('img');
        image.setAttribute('src', 'https://i.ibb.co/0V49VRZ/catto.jpg');
        const contents = document.querySelector('.contents');
        contents.appendChild(hiddenMessage).appendChild(image);
      }
  }

  //menggunakan event onclick
  // document.getElementById('incrementButton').onclick = increment;

  //fungsinya sama sperti event handler, teteapi dengan eventlistener ini lebih baik
  window.addEventListener('load', welcome);
  document.getElementById('incrementButton').addEventListener('click', increment);
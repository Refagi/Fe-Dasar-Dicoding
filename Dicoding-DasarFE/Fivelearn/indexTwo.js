document.addEventListener('DOMContentLoaded', function () {
    const inputMaxLengthOnLoad = document.getElementById('inputNama').maxLength;
    document.getElementById('sisaKarakter').innerText = inputMaxLengthOnLoad;
    
    document.getElementById('inputNama').addEventListener('input', function () {
        const jumlahKarakterDiketik = document.getElementById('inputNama').value.length;
        const jumlahKarakterMaksimal = document.getElementById('inputNama').maxLength;
    
        console.log('jumlahKarakterDiketik: ', jumlahKarakterDiketik);
        console.log('jumlahKarakterMaksimal: ', jumlahKarakterMaksimal);
    
        const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
        document.getElementById('sisaKarakter').innerText = sisaKarakterUpdate.toString();
    
        if (sisaKarakterUpdate === 0) {
          document.getElementById('sisaKarakter').innerText = 'Batas maksimal tercapai!';
        } else if (sisaKarakterUpdate <= 5) {
          document.getElementById('notifikasiSisaKarakter').style.color = 'red';
        } else {
          document.getElementById('notifikasiSisaKarakter').style.color = 'black';
        }
      });

      //menampilkan sisa karakter yg dari inputan nama, dengan event focus
      document.getElementById('inputNama').addEventListener('focus', function () {
        console.log('inputNama: focus');
        document.getElementById('notifikasiSisaKarakter').style.visibility = 'visible';
      });

      //kebalikan dari event focus di atas, ini akan menyembunyikan sisa karakter ketika menekan tombol input lain
      document.getElementById('inputNama').addEventListener('blur', function () {
        console.log('inputNama: blur');
        document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden';
      });

      //mengubah tombol submit data yg dissable, jika pesan yg disubmit sesuai, maka yg tadinya blur
      //berubah jadi tidak blur
      document.getElementById('inputCaptcha').addEventListener('change', function () {
        console.log('inputCaptcha: change');
        const inputCaptcha = document.getElementById('inputCaptcha').value;
        const submitButtonStatus = document.getElementById('submitButton');
        if (inputCaptcha === 'PRNU') {
          submitButtonStatus.removeAttribute('disabled');
        } else {
          submitButtonStatus.setAttribute('disabled', '');
        }
      });

      //memunculkan pop up , jika yg disubmit sesuai
      document.getElementById('formDataDiri').addEventListener('submit', function (event) {
        const inputCaptcha = document.getElementById('inputCaptcha').value;
        if (inputCaptcha === 'PRNU') {
          alert('Selamat! Captcha Anda lolos :D');
        } else {
          alert('Captcha Anda belum tepat :(');
          document.getElementById('submitButton').setAttribute('disabled', '');
        }
        event.preventDefault();//untuk mencegah agar saat link atau object atau submit di click tidak akan reload
      });

      //memunculkan pop up dengan event copy, jika sudah meng-copy text, maka akan mucul pop up
      document.getElementById('inputCopy').addEventListener('copy', function () {
        alert('Anda telah men-copy sesuatu...');
      });

      //memunculkan pop up, jika kita mempaste sebuah text, dengan event paste
      document.getElementById('inputPaste').addEventListener('paste', function () {
        alert('Anda telah mem-paste sebuah teks...');
      });
  });


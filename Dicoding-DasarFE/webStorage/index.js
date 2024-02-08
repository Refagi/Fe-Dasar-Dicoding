const localStorageKey = 'PRESS_FREQUENCY';

// Pengecekan: apakah data localStorage dengan key count tersedia atau belum
if (typeof Storage !== 'undefined') {
  if (localStorage.getItem(localStorageKey) === null) {
    // Jika item pada local storage belum ada, data akan diberi nilai awal, yakni 0
    localStorage.setItem(localStorageKey, 0);
  }
  const incrementButton = document.querySelector('#incrementButton');
  const clearButton = document.querySelector('#clear');
  const countDisplay = document.querySelector('#count');

  // Memberikan nilai item dari local storage
  countDisplay.innerText = localStorage.getItem(localStorageKey);

  // Update nilai dari item local storage jika tombol ditekan
  incrementButton.addEventListener('click', function () {
    let count = localStorage.getItem(localStorageKey);
    count++;
    localStorage.setItem(localStorageKey, count);
    countDisplay.innerText = localStorage.getItem(localStorageKey);
  });

    // Memberikan nilai 0 ke tampilan karena di-reset dan menghapus item
    clearButton.addEventListener('click', function () {
        localStorage.removeItem(localStorageKey);
        countDisplay.innerText = 0;
      });
} else {
    alert('Browser yang Anda gunakan tidak mendukung Web Storage');
  }

  /*kita bisa mengetahui bahwa data yang disimpan pada local storage akan bertahan walaupun jendela browser atau 
  tab browser ditutup. Untuk menghapus datanya, tekan tombol "Hapus Storage" di mana tombol tersebut akan 
  memanggil method localStorage.removeItem(). */


  const sessionStorageKey = 'PRESS_FREQUENCY';

  // Pengecekan: apakah data sessionStorage dengan key count tersedia atau belum
  if (typeof Storage !== 'undefined') {
    if (sessionStorage.getItem(sessionStorageKey) === null) {
      // Jika item pada session storage belum ada, datanya akan diatur dengan nilai awal, yakni 0
      sessionStorage.setItem(sessionStorageKey, 0);
    }
  
    const incrementButton = document.querySelector('#incrementButton');
    const clearButton = document.querySelector('#clear');
    const countDisplay = document.querySelector('#count');
  
    // Memberikan nilai item dari session storage
    countDisplay.innerText = sessionStorage.getItem(sessionStorageKey);
  
    // Mengupdate nilai dari item session storage jika tombol ditekan
    incrementButton.addEventListener('click', function () {
      let count = sessionStorage.getItem(sessionStorageKey);
      count++;
      sessionStorage.setItem(sessionStorageKey, count);
      countDisplay.innerText = sessionStorage.getItem(sessionStorageKey);
    });
    // Memberikan nilai 0 ke tampilan karena di-reset dan menghapus item
  clearButton.addEventListener('click', function () {
    sessionStorage.removeItem(sessionStorageKey);
    countDisplay.innerText = 0;
  });
} else {
  alert('Browser yang Anda gunakan tidak mendukung Web Storage');
}

/*data yang tersimpan dalam session storage akan bertahan jika terjadi reload/refresh pada browser. 
Namun, data tersebut akan hilang apabila tab browser atau browser itu sendiri ditutup. */
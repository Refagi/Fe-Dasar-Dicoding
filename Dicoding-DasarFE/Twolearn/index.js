//membuat elemenet html dan menambahkan text 
const newElement = document.createElement('li');
newElement.innerText = 'Selamat menikmati!';

//mengambil elemenet html id
const daftar = document.getElementById('daftar');
//menambahkan child elemenet pada parent element
daftar.appendChild(newElement);


const elementAwal = document.createElement('li');
elementAwal.innerText = 'Hidupkan kompor.';

const itemAwal = document.getElementById('awal');
//menambahkan child elemenet sebelum child elemenet yg lain pada parent element yg sama
//parameter pertama berisi element baru yg ingin ditambahkan
daftar.insertBefore(elementAwal, itemAwal);




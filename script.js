window.onload = () => {
  
  const content = document.querySelector('.content');
  const addInput = document.querySelector('.add-input');
  const addButton = document.querySelector('.add-button');
  addButton.addEventListener('click', () => {
    // ambil value dari input tambah data
    const value = addInput.value.trim();
    // lakukan validasi terlebih dahulu
    if (validate(value) == true) {
      // jika menghasilkan boolean true, lanjutkan eksekusi code dibawah
      const result = renderData(value);
      content.appendChild(result);
      deleteValue();
    }
  });
  
  function validate(value) {
    // jika inputan kosong
    if (!value) return sweetalert('info', 'Info', 'isi input terlebih dahulu');
    // jika inputan terlalu pendek!
    if (value.length < 3) return sweetalert('info', 'Info', 'inputan anda terlalu pendek!');
    // jika inputan terlalu panjang
    if (value.length > 400) return sweetalert('info', 'Info', 'inputan anda terlalu panjang!');
    // jika berhasil melewati semua validasi, kembalikan nilai boolean true
    return true;
  }
  
  function sweetalert(icon, title, text) {
    return swal.fire ({
      icon: icon,
      title: title,
      text: text
    });
  }
  
  function create(elementname, classname, value, show = false) {
    const element = document.createElement(elementname);
    element.className = !classname ? '' : classname;
    if (show == true) {
      const elementValue = document.createTextNode(value);
      element.appendChild(elementValue);
      return element;
    }
    return element;
  }
  
  function getClass() {
    const result = {
      box: 'bg-white p-4 rounded shadow-sm mb-2',
      paragraph: 'fw-light fs-14',
      flex: 'd-flex justify-content-between align-items-center',
      date: 'my-auto fw-light fs-13',
      editButton: 'btn btn-outline-primary rounded-1 mx-1',
      deleteButton: 'btn btn-outline-danger rounded-1'
    }
    return result;
  }
  
  function renderData(value) {
    const result = getClass();
    // buat element div untuk box beserta backgroundnya
    const box = create('div', result.box);
    // buat element paragraph 
    const paragraph = create('p', result.paragraph, value, true);
    // buat element dib yang menampung class flexbox
    const flex = create('div', result.flex);
    // buat element i yang khusus untuk menampilkan tanggal dan waktu
    const date = create('i', result.date, getDateNow(), true);
    // buat element untuk pembungkus element button
    const wrapper = create('div', 'button-wrappee');
    // buat element edit button
    const editButton = create('button', result.editButton);
    editButton.addEventListener('click', () => {
      editData(box, paragraph);
    });
    // tambahkan beberapa attribute baru ke edit button
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#modal');
    // buat element i yang berisikan icon pena
    const pen = create('i', 'fa-solid fa-pen');
    editButton.appendChild(pen);
    // buat element delete button
    const deleteButton = create('button', result.deleteButton);
    deleteButton.addEventListener('click', () => {
      deleteData(box);
    });
    // buat element i yang berisikan icon sampah
    const trash = create('i', 'fa-solid fa-trash');
    deleteButton.appendChild(trash);
    
    wrapper.appendChild(editButton);
    wrapper.appendChild(deleteButton);
    
    flex.appendChild(date);
    flex.appendChild(wrapper);
    
    box.appendChild(paragraph);
    box.appendChild(flex);
    
    /*
      jadikan semua data menjadi satu dan 
      kembalikan nilainya
    */
    
    // jalankan juga function searching
    searching(box, value);
    
    return box;
  }
  
  function deleteValue() {
    addInput.value = '';
  }
  
  function deleteData(box) {
    swal.fire ({
      icon: 'warning',
      title: 'Peringatan!',
      text: 'apakah anda yakin ingin menghapus data tersebut?',
      showCancelButton: true,
      cancelButtonText: 'tidak',
      confirmButtonText: 'yakin'
    }).then(result => {
      if (result.isConfirmed) {
        box.remove();
        sweetalert('success', 'Berhasil', 'data berhasil dihapus!');
      }
    });
  }
  
  function editData(box, param) {
    const editInput = document.querySelector('.edit-input');
    // masukkan value dari paragraph kedalam input edit
    editInput.value = param.textContent;
    const editButton = document.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
      const value = editInput.value.trim();
      // lakukan validasi terlebih dahulu
      if (validate(value) == true) {
        // ubah value paragraph dengan value dari input edit
        param.textContent = value;
        // jalankan lagi fitur pencarian datanya
        searching(box, param.textContent);
        /* 
          setelah value diganti, ganti isi dari param menjadi 
          null atau string kosong supaya tidak menduplikat
          data lainnya saat sedang mengubah data
        */
        param = null;
        sweetalert('success', 'Berhasil', 'data berhasil diubah');
      }
    });
  }
  
  function searching(box, value) {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keyup', function() {
      const inputValue = this.value.toLowerCase().trim();
      box.style.display = (value.toLowerCase().indexOf(inputValue) != -1) ? '' : 'none';
    });
  }
  
  function getDateNow() {
    const date = new Date();
    // ambil jam, menit dan detik
    const hour = setTime(date.getHours()); // 0 - 23
    const minute = setTime(date.getMinutes()); // 0 - 59
    const second = setTime(date.getSeconds()); // 0 - 59
    // ambil bulan dan hari
    const month = setMonth(date.getMonth()); // 0 - 11
    const day = setDay(date.getDay()); // 0 - 6
    // kembalikan nilainya
    return `${month} - ${day}, ${hour}:${minute}:${second}`;
  }
  
  function setDay(day) {
    switch (day) {
      case 0 : day = 'minggu'; break;
      case 1 : day = 'senin'; break;
      case 2 : day = 'selasa'; break;
      case 3 : day = 'rabu'; break;
      case 4 : day = 'kamis'; break;
      case 5 : day = 'jum\`at'; break;
      case 6 : day = 'sabtu'; break;
      default : day = 'error';
    }
    return day;
  }
  
  function setMonth(month) {
    switch (month) {
      case 0 : month = 'january'; break;
      case 1 : month = 'february'; break;
      case 2 : month = 'maret'; break;
      case 3 : month = 'april'; break;
      case 4 : month = 'mei'; break;
      case 5 : month = 'juni'; break;
      case 6 : month = 'july'; break;
      case 7 : month = 'agustus'; break;
      case 8 : month = 'september'; break;
      case 9 : month = 'oktober'; break;
      case 10 : month = 'november'; break;
      case 11 : month = 'desember'; break;
      default : month = 'error';
    }
    return month;
  }
  
  function setTime(number) {
    /*
      cek terlebih dahulu, aoajah value dari param adalah tipe angka
      jika iya, maka lakukan eksekusi dibawahnya
    */
    if (typeof number == 'number') {
      const result = (number < 10) ? '0' + number : number;
      return result;
    }
  }
  
}

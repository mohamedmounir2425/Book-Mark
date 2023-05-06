const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const addBtn = document.getElementById("addBtn");
const tbody = document.getElementById("tbody");
const ErrorMsg = document.getElementById("ErrorMsg");

let bookMarks;
let indexUpdated = 0
if(localStorage.getItem('bookMarks')) {
  bookMarks = JSON.parse(localStorage.getItem('bookMarks'))

}else {
  bookMarks = []
}
displayBook(bookMarks);

addBtn.onclick = () => {
  let btnValue = addBtn.innerHTML
  if(btnValue === 'Update bookMark') {
    bookMarks[indexUpdated].name = nameInput.value;
    bookMarks[indexUpdated].url = urlInput.value;
    addBtn.innerHTML = 'Submit'

  }else {
  const bookMark = {
    name: nameInput.value,
    url: urlInput.value,
  };
  bookMarks.push(bookMark)
}
localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
displayBook(bookMarks);
clearInput()
};
let regUrl = /^(http:\/\/)?(www\.)?[a-zA-z]{1,}\.[a-z]{3}$/;

function isUrlValid() {
  if (regUrl.test(urlInput.value)) {
    return true;
  } else {
    return false;
  }
}
let regName = /^[a-zA-Z0-9]{3,30}$/;
function isNameValid() {
if(regName.test(nameInput.value)){
  return true
}else{
  return false
}
}

nameInput.onkeyup = function() {
  if(isNameValid() && isUrlValid()) {
    addBtn.removeAttribute('disabled')
    // ErrorMsg.classList.remove('d-none')
  }else {
    addBtn.disabled = 'true'
    // ErrorMsg.classList.add('d-none')
  }
}
urlInput.onkeyup = function() {
  if(isNameValid() && isUrlValid()) {
    addBtn.removeAttribute('disabled')
    // ErrorMsg.classList.remove('d-none')
  }else {
    addBtn.disabled = 'true'  
    // ErrorMsg.classList.add('d-none')
  }
}


function displayBook(arr) {
  let marks = ``;
  arr.forEach((bookMark, i) => {
    marks += `
        <tr>
            <td>${bookMark.name}</td>
            <td><a href="${bookMark.url}" target="_blank"  class="btn btn-primary">Visit</a></td>
            <td><button onClick="update(${i})"  class="btn btn-warning">Update</button></td>
            <td><button onClick="deleteBook(${i})"  class="btn btn-danger">Delete</button></td>
        </tr>
        `;
  });

  tbody.innerHTML = marks;
}


function deleteBook(i) {
  bookMarks = bookMarks.filter((bookmark,index) => index != i)
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));

  displayBook(bookMarks);
} 
function clearInput() {
  nameInput.value = ''
  urlInput.value = ''
}
function update(i) {
  nameInput.value = bookMarks[i].name;
  urlInput.value = bookMarks[i].url;
  addBtn.innerHTML = 'Update bookMark'
  indexUpdated = i
}

function search(term) {
 

    let searched = bookMarks.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
 
      displayBook(searched)
   

}
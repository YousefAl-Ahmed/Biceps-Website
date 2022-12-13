

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const submitButton = document.getElementById('submit');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})


overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
//   popUp functionality ends here

// document.getElementById('submit').onclick = function () {
//   var selected = [];
//   for (var option of document.getElementById('Exercises').options) {
//     if (option.selected) {
//       selected.push(option.value);
//     }
//   }
//   console.log(selected);
//   alert(selected);
// }
// Choose exercises functionality starts here

const showExercises = async () => {
  const url = submitButton.getAttribute('class');
  await fetch(url)

}


const sendExercises = async () => {

  var selected = [];
  for (var option of document.getElementById('Exercises').options) {
    if (option.selected) {
      selected.push(option.value);
    }
  }

  const op = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selected)
  }

  const url = submitButton.getAttribute('class');

  await fetch(url, op)
  // await showExercises();
}

// document.getElementById('submit').onclick = sendExercises();
submitButton.addEventListener("click", () => sendExercises())


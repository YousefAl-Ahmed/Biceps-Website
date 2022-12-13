const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const planNameForm = document.querySelector('form')

const newPlanName = document.querySelector('.chooseDayPlanName')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

// planNameForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   getPlanNameValue();
// })

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

// function getPlanNameValue() {

//   const planName = planNameForm.querySelector('input[name=planNameValue]')?.value;
//   localStorage.setItem('planName', planName);
//   window.location.href = '/plans-chooseDay';
//   console.log(planName);
// }



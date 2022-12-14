

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const submitButton = document.getElementById('submit');
const cardsContainer = document.querySelector('.cards-container');

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

submitButton.addEventListener('click', () => {
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



const showExercises = async (selected) => {

  const url = submitButton.getAttribute('class');
  console.log(url)
  fetch(`${url}/exercises`).then(res => res.json()).then(res => {
    res.forEach(muscle => {
      muscle.forEach(exercise => {
        selected.forEach(id => {

          if (id == exercise.exercise_id){
            const card = document.createElement("div");
            card.classList.add("card");

            const a = document.createElement("a");
            a.href = `/body-parts/${exercise.muscle}/${exercise.name}`;
            a.target = "_self";

            const img = document.createElement("img");
            img.classList.add("card-img");
            img.src = `/img/${exercise.muscle}-workouts/${exercise.img}`;

            const cardTitle = document.createElement("div");
            cardTitle.classList.add("card-title");

            const name = document.createElement("p");
            name.innerHTML = exercise.name;
          
        
            a.appendChild(img);
            cardTitle.appendChild(name);

            card.append(a, cardTitle)
            cardsContainer.appendChild(card);

          }
        })
      })
    });
  })

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
  showExercises(selected);
}

// document.getElementById('submit').onclick = sendExercises();
submitButton.addEventListener("click", sendExercises)



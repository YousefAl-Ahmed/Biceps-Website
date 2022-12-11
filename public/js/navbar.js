const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]
const profileNav = document.getElementsByClassName('profileNav')
const logOutNav = document.getElementsByClassName('logOutNav')
const drowdownButton = document.getElementsByClassName('dropdown')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})
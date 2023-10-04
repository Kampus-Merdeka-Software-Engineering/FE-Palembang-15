const menuToggle = document.querySelector('menu-toggle input');
const nav = document.querySelector('navbar-container ul');

menuToggle.addEventListener('click', function () {
    nav.classList.toggle('slide');
});

function redirectToVideo(courseId) {
    window.location.href = `Video_E-Learning.html?courseId=${courseId}&episode=1`;
}

function tampilinVideo(courseId, episode) {
    window.location.href = `Video_E-Learning.html?courseId=${courseId}&episode=${episode}`;
}


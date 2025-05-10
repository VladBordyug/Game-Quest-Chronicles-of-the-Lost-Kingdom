const aboutButton = document.getElementById('about-button');
const aboutModal = document.getElementById('about-modal');
const closeButton = document.querySelector('.close-button');
const startButton = document.getElementById('start-button');
const mainContent = document.querySelector('main');
const gameMenu = document.getElementById('game-menu');
document.addEventListener('DOMContentLoaded', function() {
    const screenshotImages = document.querySelectorAll('.screenshot-image');

    screenshotImages.forEach(image => {
        image.addEventListener('click', function() {
            
            this.style.transform = 'scale(1.5)';
            this.style.transition = 'transform 0.3s ease';

            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300); 
        });
    });
});
aboutButton.addEventListener('click', () => {
    aboutModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});

startButton.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    setTimeout(() => {
        mainContent.style.display = 'none';
        gameMenu.classList.remove('hidden');
        gameMenu.classList.add('visible');
    }, 1000);

    
    const newWindow = window.open('', '_blank');

    newWindow.document.body.style.backgroundColor = '#008000'; 
    newWindow.document.body.style.color = '#e0f2f7'; 
    newWindow.document.body.style.margin = '0';
    newWindow.document.body.style.padding = '0';

    newWindow.document.document.write('<h1>Ласкаво просимо до гри!</h1>');

    newWindow.document.title = 'Гра';
});

document.getElementById('start-button').addEventListener('click', function () {
    alert('Квест розпочато! Насолоджуйтесь грою!');
});

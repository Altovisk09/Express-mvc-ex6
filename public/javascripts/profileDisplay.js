document.addEventListener('DOMContentLoaded', function () {
    const geral = document.getElementById('config-geral');
    const password = document.getElementById('config-senha');
    const userConfigDisplay = document.getElementById('userConfigDisplay');
    const userPassDisplay = document.getElementById('userPassDisplay');

    
    userConfigDisplay.style.display = 'block';
    userPassDisplay.style.display = 'none';

    geral.addEventListener('click', () => {
        userConfigDisplay.style.display = 'block';
        userPassDisplay.style.display = 'none';
    });

    password.addEventListener('click', () => {
        userConfigDisplay.style.display = 'none';
        userPassDisplay.style.display = 'block';
    });
});
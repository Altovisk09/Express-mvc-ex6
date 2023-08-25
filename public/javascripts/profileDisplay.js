document.addEventListener('DOMContentLoaded', function () {
    const geral = document.getElementById('config-geral');
    const password = document.getElementById('config-senha');
    const userConfigDisplay = document.getElementById('userConfigDisplay');
    const userPassDisplay = document.getElementById('userPassDisplay');
    const contentMain = document.getElementById('content-main')
    
    userConfigDisplay.style.display = 'block';
    userPassDisplay.style.display = 'none';

    geral.addEventListener('click', () => {
        userConfigDisplay.style.display = 'block';
        userPassDisplay.style.display = 'none';
        contentMain.style.marginBottom = '3rem';
    });

    password.addEventListener('click', () => {
        userConfigDisplay.style.display = 'none';
        userPassDisplay.style.display = 'block';
        contentMain.style.marginBottom = '20rem';
    });
});
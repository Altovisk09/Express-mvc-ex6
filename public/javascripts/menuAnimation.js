document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.listMenu a li');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); 
            links.forEach(l => l.classList.remove('active'));

            this.classList.add('active');
        });
    });
});

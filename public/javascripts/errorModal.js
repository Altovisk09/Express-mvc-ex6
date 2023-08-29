document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('errorModal');
    const okButton = document.getElementById('okButton');
            
    okButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });
});

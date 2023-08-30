const openModalButton = document.getElementById("openModalButton");
const modal = document.getElementById("myModal");
const closeModalButton = document.querySelector(".close");
const cancelButton = document.getElementById("cancelButton");

openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
});

closeModalButton.addEventListener("click", () => {
    closeModal();
});

cancelButton.addEventListener("click", () => {
    closeModal();
});

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; 
}

const avatarImage = document.getElementById("avatarImage");
const avatarModal = document.getElementById("avatarModal");
const closeAvatarButton = avatarModal.querySelector(".close");
const cancelAvatarButton = document.getElementById("cancelAvatarButton");

avatarImage.addEventListener("click", () => {
    avatarModal.style.display = "block";
    document.body.style.overflow = "hidden";
});

closeAvatarButton.addEventListener("click", () => {
    closeAvatarModal();
});

cancelAvatarButton.addEventListener("click", () => {
    closeAvatarModal();
});

function closeAvatarModal() {
    avatarModal.style.display = "none";
    document.body.style.overflow = "auto";
}

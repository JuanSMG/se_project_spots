const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Avey long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnels with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = editProfileModal.querySelector(".modal__close-button");

const newPostAddBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");

const profileHeadingEl = document.querySelector(".profile__heading");
const profileDescriptionEl = document.querySelector(".profile__discription");

const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const profileFormElement = editProfileModal.querySelector(".modal__form");

const newPostImageInput = newPostModal.querySelector("#profile-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);

const newPostFormElement = newPostModal.querySelector(".modal__form");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

profileEditBtn.addEventListener("click", function () {
  openModal(editProfileModal);

  profileNameInput.value = profileHeadingEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
});

profileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileHeadingEl.textContent = profileNameInput.value;
  profileDescriptionEl.textContent = profileDescriptionInput.value;

  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  console.log(newPostImageInput.value);
  console.log(newPostCaptionInput.value);

  closeModal(newPostModal);
}

newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
});

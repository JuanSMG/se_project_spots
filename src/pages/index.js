import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import  Api  from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Golden gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "Avey long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnels with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4e2987cf-589c-465a-b417-affb61aa35df",
    "Content-Type": "application/json"
  },
});


const profileAvatarEl = document.querySelector(".profile__avatar")
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const profileAvatarModal = document.querySelector("#avatar-profile-modal");
const profileAvatarForm = profileAvatarModal.querySelector(".modal__form");
const profileAvatarCloseBtn = profileAvatarModal.querySelector(".modal__close-button");
const profileAvatarSubmitButton = profileAvatarModal.querySelector(".modal__save-button");
const profileAvatarInput = profileAvatarModal.querySelector("#profile-avatar-input");

const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = editProfileModal.querySelector(".modal__close-button");

const newPostAddBtn = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");

const profileHeadingEl = document.querySelector(".profile__heading");
const profileDescriptionEl = document.querySelector(".profile__description");

const profileNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const profileFormElement = document.querySelector(".modal__form");

const newPostImageInput = newPostModal.querySelector("#profile-image-input");
const newPostCaptionInput = newPostModal.querySelector(
  "#profile-caption-input",
);
const newPostFormElement = newPostModal.querySelector(".modal__form");

const newPostSubmitButton = newPostModal.querySelector(".modal__save-button");
const profileSubmitButton = editProfileModal.querySelector(
  ".modal__save-button",
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const deleteCardModal = document.querySelector("#card-delete-modal");
const deleteCardCloseBtn = deleteCardModal.querySelector(".modal__close-button");
const deleteCardCancelButton = deleteCardModal.querySelector(".modal__cancel-button");
const deleteCardForm = deleteCardModal.querySelector(".modal__form");


const previewModal = document.querySelector("#Preview-image-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-button");
const previewModalImage = previewModal.querySelector(".modal__preview-image");
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption",
);


let myUserId;

api.getAppInfo()
.then(([cards, userData]) => {
   myUserId = userData._id;
   console.log(cards);
   profileHeadingEl.textContent = userData.name;
   profileDescriptionEl.textContent = userData.about;
   profileAvatarEl.src = userData.avatar;
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

})
 .catch(console.error);

const modalList = document.querySelectorAll(".modal");
modalList.forEach((modalEl) => {
  modalEl.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modalEl") ||
      evt.target.classList.contains("modal_is-opened")
    ) {
      closeModal(modalEl);
    }
  });
});

let selectedCard, selectedCardId;

 function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteCardModal);
  })
  .catch(console.error);
 }


function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteCardModal);
}

function handleLike(evt, id) {
  const isLiked = !evt.target.classList.contains("card__heart-button_click");
  api.changeLike(id, isLiked)
  .then((userLiked) => {
  isLiked.classList.toggle("card__heart-button_click", userLiked);
  })
  .catch(console.error);
}


function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__description");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeBtnEl = cardElement.querySelector(".card__heart-button");

  likeBtnEl.addEventListener("click", (evt) =>
   evt.target.classList.toggle("card__heart-button_click"));

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;


  likeBtnEl.addEventListener("click", (evt) =>
   handleLike(evt, data._id));



  const deleteBtnEl = cardElement.querySelector(".card__delete-button");
  deleteBtnEl.addEventListener("click", () => handleDeleteCard(cardElement, data._id));

  cardImageEl.addEventListener("click", () => {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

deleteCardCloseBtn.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

deleteCardCancelButton.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

deleteCardForm.addEventListener("submit", handleDeleteCardSubmit);

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});


function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_is-opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

profileEditBtn.addEventListener("click", function () {
  profileNameInput.value = profileHeadingEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    profileFormElement,
    [profileNameInput, profileDescriptionInput],
    settings,
  );
  openModal(editProfileModal);
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

profileAvatarButton.addEventListener("click", function () {
  openModal(profileAvatarModal);
});

profileAvatarCloseBtn.addEventListener("click", function () {
  closeModal(profileAvatarModal);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api.editUserAvatar( profileAvatarInput.value )
  .then((data) => {
    profileAvatarEl.src = data.avatar;
    closeModal(profileAvatarModal);
    disableButton(profileAvatarSubmitButton, settings);
  })
   .catch(console.error);
}

profileAvatarForm.addEventListener("submit", handleAvatarFormSubmit);


function handleAddNewCard(evt) {
  evt.preventDefault();
  api.addNewCard({ name: newPostCaptionInput.value, link: newPostImageInput.value })
  .then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
    newPostFormElement.reset();
    disableButton(newPostSubmitButton, settings);
    closeModal(newPostModal);
  })
  .catch(console.error);
}

newPostFormElement.addEventListener("submit", handleAddNewCard);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api.editUserInfo({ name: profileNameInput.value, about: profileDescriptionInput.value })
  .then((userData) => {
    profileHeadingEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    closeModal(editProfileModal);
    disableButton(profileSubmitButton, settings);
  })
  .catch(console.error);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

enableValidation(settings);

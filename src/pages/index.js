import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setButtontext } from "../utils/helpers.js";
import  Api  from "../utils/Api.js";


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
  const submitButton = evt.submitter;
  setButtontext(submitButton, true, "Delete", "Deleting...");


  api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    closeModal(deleteCardModal);
  })
  .catch(console.error)
  .finally(() => {
  setButtontext(submitButton, false, "Delete", "Deleting...")
  });
 }


function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteCardModal);
}

function handleLike(evt, id) {
  const likeBtnEl = evt.currentTarget;
  const isLiked = likeBtnEl.classList.contains("card__heart-button_click");
  api.changeLike(id, isLiked)
    .then((updatedCard) => {
      const userLiked = updatedCard.isLiked;
      likeBtnEl.classList.toggle("card__heart-button_click", userLiked);
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


  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;


   const isLiked = data.isLiked;
   likeBtnEl.classList.toggle("card__heart-button_click", isLiked);


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
  const submitButton = evt.submitter;
  setButtontext(submitButton, true);

  api.editUserAvatar( profileAvatarInput.value )
  .then((data) => {
    profileAvatarEl.src = data.avatar;
    closeModal(profileAvatarModal);
    disableButton(profileAvatarSubmitButton, settings);
  })
   .catch(console.error)
    .finally(() => {
    setButtontext(submitButton, false);
    });
}

profileAvatarForm.addEventListener("submit", handleAvatarFormSubmit);


function handleAddNewCard(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtontext(submitButton, true);

  api.addNewCard({ name: newPostCaptionInput.value, link: newPostImageInput.value })
  .then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
    newPostFormElement.reset();
    disableButton(newPostSubmitButton, settings);
    closeModal(newPostModal);
  })
  .catch(console.error)
  .finally(() => {
    setButtontext(submitButton, false);
});
}

newPostFormElement.addEventListener("submit", handleAddNewCard);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  setButtontext(submitButton, true);



  api.editUserInfo({ name: profileNameInput.value, about: profileDescriptionInput.value })
  .then((userData) => {
    profileHeadingEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    closeModal(editProfileModal);
    disableButton(profileSubmitButton, settings);
  })
  .catch(console.error)
  .finally(() => {
  setButtontext(submitButton, false);
});
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

enableValidation(settings);

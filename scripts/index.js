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

profileEditBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");

  profileNameInput.value = profileHeadingEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
});

profileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostAddBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileHeadingEl.textContent = profileNameInput.value;
  profileDescriptionEl.textcontent = profileDescriptionInput.value;

  editProfileModal.classList.remove("modal_is-opened");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  console.log("newPostImageInput");
  console.log("newPostCaptionInput");

  newPostModal.classList.remove("modal_is-opened");
}

newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

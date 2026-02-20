export function setButtontext(button, isLoading, defaultText = "Save", loadingText = "Saving...") {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = defaultText;
  }
}
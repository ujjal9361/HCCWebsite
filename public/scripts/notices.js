let textAreas = document.querySelectorAll("textarea");
textAreas.forEach(textArea => {
  textArea.style.height = textArea.scrollHeight + "px";
  textArea.addEventListener("input", () => {
    textArea.style.height = textArea.scrollHeight + "px";
  })
})

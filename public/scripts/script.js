let menuIcon = document.querySelector(".menuIcon");
let navMenu = document.querySelector(".navMenu");
let navSection = document.querySelector("#navSection");
let textAreas = document.querySelectorAll("textarea");
function controlSmallNav() {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("rotateLines");
    if (menuIcon.classList.contains("rotateLines")) {
      navMenu.style.height = "250px";
      navSection.style.borderBottom = "2px solid #e3e3e3";
    } else {
      navMenu.style.height = 0;
      navSection.style.borderBottom = "none";
    }
  });
}
function askToDelete(e) {
  let result = confirm(
    "This will permanently delete all the data of the event. We cannot recover them once you delete it. \nAre you sure you want to permanently delete this event?"
  );
  if (result) e.target.parentNode.submit();
}
controlSmallNav();

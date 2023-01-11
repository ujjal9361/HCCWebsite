let menuIcon = document.querySelector(".menuIcon");
let navMenu = document.querySelector(".navMenu");
let navSection = document.querySelector("#navSection");
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
// let navLinks = document.querySelectorAll(".nav-link");
// //Listen for a click to all buttons
// //Whenever a button is clicked
// //Remove class activePageMenu from every button
// //Add class activePageMenu in the clicked button
// navLinks.forEach((navLink) => {
//   console.log(navLink);
//   navLink.addEventListener("click", () => {
//     console.log("nav-link clicked");
//     navLinks.forEach((navlink) => {
//       console.log(navlink);
//       if (navlink.classList.contains("activePageMenu")) {
//         navlink.classList.remove("activePageMenu");
//       }
//     });
//     navLink.classList.add("activePageMenu");
//   });
// });

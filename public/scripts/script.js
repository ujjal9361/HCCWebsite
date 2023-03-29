let menuIcon = document.querySelector(".menuIcon");
let navMenu = document.querySelector(".navMenu");
let navSection = document.querySelector("#navSection");
let textAreas = document.querySelectorAll("textarea");
let userProfileDropDown = document.querySelector(".userProfileDropDown");
let myProfile = document.querySelector(".myProfile");
function toggleMenu(button, target){
  button.addEventListener("click",()=>{
    target.classList.toggle("active");
  })
}
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
function askToDeleteEvent(eventForm) {
  let result = confirm(
    "This will permanently delete all the data of the event. We cannot recover them once you delete it. \nAre you sure you want to permanently delete this event?"
  );
  if(result)
    eventForm.submit();
}
//if user clicks anywhere except the myprofile menu close the menu
document.addEventListener("click",e=>{
  if(myProfile.contains(e.target))
    return;
  userProfileDropDown.classList.remove("active");
});
controlSmallNav();
toggleMenu(myProfile, userProfileDropDown);
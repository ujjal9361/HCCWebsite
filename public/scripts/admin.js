//Variables
let addUserModal = document.querySelector(".addUserModal");
let searchInput = document.querySelector(".searchInput");
let canceladdUserModalBtn = document.querySelector(".addUserModal .cancelBtn");
let addBtn = document.querySelector(".addBtn");
let tableRow = document.querySelectorAll(".userListTable tbody tr");

//Functions
function filter(tableRow, searchInput) {
  let inputValue = searchInput.value.toLowerCase().trim();
  tableRow.forEach((row) => {
    let fullName = row.children[1].textContent.toLowerCase();
    if (fullName.includes(inputValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

//Main
addBtn.addEventListener("click", () => {
  if (addBtn.classList.contains("addStudent")) {
    document.querySelector("#studentRadio").checked = true;
  } else if (addBtn.classList.contains("addTeacher")) {
    document.querySelector("#teacherRadio").checked = true;
  }
  addUserModal.showModal();
});
canceladdUserModalBtn.addEventListener("click", () => {
  addUserModal.close();
});
searchInput.addEventListener("keyup", () => {
  filter(tableRow, searchInput);
});

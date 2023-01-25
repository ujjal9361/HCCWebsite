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

//active for tables and
//activeUserList for the tab

const tabButtons = document.querySelectorAll("[data-target-table]");
console.log(tabButtons);
const tables = document.querySelectorAll(".userListTable");
console.log(tables);
tabButtons.forEach((tabButton) => {
  const targetTable = document.querySelector(tabButton.dataset.targetTable);
  tabButton.addEventListener("click", () => {
    tables.forEach((table) => {
      table.classList.remove("active");
    });
    targetTable.classList.add("active");
    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove("activeUserList");
    });
    tabButton.classList.add("activeUserList");
  });
});

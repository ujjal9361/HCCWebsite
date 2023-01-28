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
  addUserModal.showModal();
});
canceladdUserModalBtn.addEventListener("click", () => {
  console.log("cliked cancel");
  addUserModal.close();
});
searchInput.addEventListener("keyup", () => {
  filter(tableRow, searchInput);
});

//active for tables and
//activeUserList for the tab

const tabButtons = document.querySelectorAll("[data-target-table]");
const tables = document.querySelectorAll(".userListTable");
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
    const targetRadioButton = document.querySelector(
      tabButton.dataset.radiobutton
    );
    targetRadioButton.checked = true;
  });
});

function askToDeleteEvent(eventForm) {
  let result = confirm(
    "This will permanently delete all the data of the event. We cannot recover them once you delete it. \nAre you sure you want to permanently delete this event?"
  );
  if (result) eventForm.submit();
}

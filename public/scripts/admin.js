//Variables
let addUserModal = document.querySelector(".addUserModal");
let addModalUserName = document.querySelector(".addUserModal #fullName");
let addModalUserEmail = document.querySelector(".addUserModal #email");
let addModalUserPhoneNumber = document.querySelector(".addUserModal #phoneNumber");
let searchInput = document.querySelector(".searchInput");
let canceladdUserModalBtn = document.querySelector(".addUserModal .cancelBtn");
let addBtn = document.querySelector(".addBtn");
let tableRow = document.querySelectorAll(".userListTable tbody tr");
let addUserModalTitles = document.querySelectorAll(".addUserModal .title");
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
function resetForm(...inputTags){
  for(let inputTag of inputTags){
    inputTag.value = "";
  }
}
function askToDeleteUserData(userDataForm) {
  let result = confirm(
    "This will permanently delete this User's Data. We cannot recover them once you delete it. \nAre you sure you want to delete?"
  );
  if (result) userDataForm.submit();
}
//Main
addBtn.addEventListener("click", () => {
  addUserModal.showModal();
});
canceladdUserModalBtn.addEventListener("click", () => {
  resetForm(addModalUserName, addModalUserEmail, addModalUserPhoneNumber);
  document.querySelector("#errorMsgAddUserModal").innerHTML="";
  addUserModal.close();
});
searchInput.addEventListener("keyup", () => {
  filter(tableRow, searchInput);
});

//active for tables and
//activeUserList for the tab

const tabButtons = document.querySelectorAll("[data-target-table]");
const tables = document.querySelectorAll(".userListTable");
const titles = document.querySelectorAll(".title");
tabButtons.forEach((tabButton) => {
  const targetTable = document.querySelector(tabButton.dataset.targetTable);
  const targetUserPara = document.querySelector(tabButton.dataset.user);
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
    titles.forEach((title) => {
      title.classList.remove("active");
    });
    targetUserPara.classList.add("active");
  });
});

let addUserModal = document.querySelector(".addUserModal");
let canceladdUserModalBtn = document.querySelector(".addUserModal .cancelBtn");
let addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", ()=>{
    if(addBtn.classList.contains("addStudent")){
        document.querySelector("#studentRadio").checked = true;
    }
<<<<<<< HEAD
    else if(addBtn.classList.contains("addTeacher")){
        document.querySelector("#teacherRadio").checked = true;
    }
    addUserModal.showModal();
})
canceladdUserModalBtn.addEventListener("click",()=>{
    addUserModal.close();
})
=======
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
>>>>>>> c0a4ca051d8861c854667c7eea9ea3864fa08fad

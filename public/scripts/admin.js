let addUserModal = document.querySelector(".addUserModal");
let canceladdUserModalBtn = document.querySelector(".addUserModal .cancelBtn");
let addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", ()=>{
    if(addBtn.classList.contains("addStudent")){
        document.querySelector("#studentRadio").checked = true;
    }
    else if(addBtn.classList.contains("addTeacher")){
        document.querySelector("#teacherRadio").checked = true;
    }
    addUserModal.showModal();
})
canceladdUserModalBtn.addEventListener("click",()=>{
    addUserModal.close();
})
// PAULINE: need to add event listeners

const btnEdit = document.getElementById("btn-edit"); 

//Update 

// function editUser -->e target

const editUser =(e)=>{
    e.preventDefault();
   
    const error = document.querySelector(".error");
    const nameInputValue= document.getElementById("input-name").value
    const emailInputValue = document.getElementById("input-email").value
    const passwordInputValue = document.getElementById("input-password").value


    const id = document.getElementById("form-profile").getAttribute("data-userId");

    axios
    .patch("/api/user/" + id, {
        name: nameInputValue,
        email: emailInputValue,
        password: passwordInputValue
    })
    .then((apiRes)=>{
        const userName= document.querySelector(`#input-name`)
        const userEmail = document.querySelector(`#input-email`)
        const userPassword = document.querySelector(`#input-password`)

        // console.log(apiRes.data)
        userName.textContent = apiRes.data.name;
        userEmail.textContent = apiRes.data.email;
        userPassword.textContent = apiRes.password;

        error.textContent = "";
    })
        .catch((apiErr) => {
    
            error.textContent = apiErr.response.data.message;


        
    });

} ;

document.getElementById("form-profile").onsubmit = editUser;


// Password

const eye = document.querySelector(".visible"); 
const input = document.querySelector("#input-password"); 

const changeVisibility = () => {
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        eye.innerHTML = `<i class="fa eye fa-eye-slash"></i>`

    } else {
        input.setAttribute("type", "password");
        eye.innerHTML = `<i class="fas fa-eye"></i>`
    }
}

eye.onclick = changeVisibility; 

// Delete button are you sure?

const deleteButton = document.querySelector("#delete-btn");


const displayMessage = (e) => {
    e.preventDefault();

   const div = document.createElement("div");
   div.classList.add("deletePrompt");
   const prompt = document.createElement("div");
   div.appendChild(prompt);
   const promptText = document.createElement("p");
   promptText.innerText = "Are you sure you want to delete?";
   prompt.appendChild(promptText);
   // Delete is a post request sent by a form
   const deleteForm = document.createElement("form");
   deleteForm.method = "POST";
   prompt.appendChild(deleteForm);
   const confirmDelete = document.createElement("button");
   confirmDelete.innerText = "Delete";
   deleteForm.appendChild(confirmDelete);
   const cancelDelete = document.createElement("button");
   cancelDelete.innerText = "Cancel";
   prompt.appendChild(cancelDelete);
   cancelDelete.onclick = function () {
       div.remove();
   };
    deleteButton.onclick = function (e) {
       
        const id = document.getElementById("form-profile").getAttribute("data-userId");
       deleteForm.action = `/user/${id}/delete`;
       confirmDelete.onclick = function () {
           console.log(id);
       };
       e.preventDefault();
       document.querySelector("html").appendChild(div);
   };
}

const deleteForm = document.getElementById("form-delete");
deleteForm.onsubmit = displayMessage;








// PAULINE: need to add event listeners

const btnEdit = document.getElementById("btn-edit"); 

//Update 

// function editUser -->e target

const editUser =(e)=>{
    e.preventDefault();
   
    
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
    })
        .catch((apiErr) => {
        
            const error = document.querySelector(".error");
            error.textContent = apiErr.response.data.message;
        
    });

} ;

document.getElementById("form-profile").onsubmit = editUser;


// Password

const eye = document.querySelector(".fa.eye"); 
const input = document.querySelector("#input-password"); 

const changeVisibility = () => {
    if (input.type === "password") {
        input.type="text"
    } else {
        input.type = "password"; 
    }
}

eye.onclick = changeVisibility; 

// Delete button are you sure?

const deleteBtn = document.querySelector("#delete-btn");


const displayMessage = () => {
    confirm("Are you sure you want to leave us :'(? ")
}

deleteBtn.onclick = displayMessage(); 






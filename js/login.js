let page = "signin"

render("signin")

document.querySelector("#login-container").addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        confirm()
    }
})

function render(type){
    page = type
    if(type === "signin"){
        document.querySelector("#login-container .signin").classList.add("active")
        document.querySelector("#login-container .signup").classList.remove("active")
    }
    else if(type === "signup"){
        document.querySelector("#login-container .signup").classList.add("active")
        document.querySelector("#login-container .signin").classList.remove("active")
    }
}

function confirm(){
    if(!checkLogin())return

    let inputs = document.querySelectorAll("#login-container section.active input")

    if(page === "signin"){
        fetch(`../backend/user.php/login?email=${inputs[0].value}&password=${inputs[1].value}`)
            .then((response) => {
                return response.json()
            })
            .then(answer=>{
                console.log(answer)
                if(answer.loggedIn === true){
                    window.location.replace(document.location.href.replace("/login", ""));
                }
                else{
                    showError(["invalid mail or password entered"])
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    else if(page === "signup"){
        const data = {name: inputs[0].value, email: inputs[1].value, password: inputs[2].value, adminPassword: inputs[4].value};
        console.log(data)
        fetch("../backend/user.php/create", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            console.log(response.body)
            return response.json()
        })
        .then((data) => {
            if(data.emailUsed === true){
                showError(["An account already exists with this email."])
            }
            else if(data.loggedIn === true){
                window.location.replace(document.location.href.replace("/login", ""));
            }

            console.log(data.message)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
}

function checkLogin(){
    let inputs = document.querySelectorAll("#login-container section.active input")
    let error = []

    if(page === "signin"){
        if(!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(inputs[0].value))//first has to be valid email
            error.push("invalid email entered")
        if(inputs[1].value === ""){
            error.push("enter a password to continue")
        }
    }
    else if(page === "signup"){
        if(!/^[a-zA-Z0-9_-]+$/.test(inputs[0].value))//first has to be valid name
            error.push("shelter name should only contain numbers letters and - _")
        if(!/[a-zA-Z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}/.test(inputs[1].value))//second has to be valid email
            error.push("invalid email entered")

        let validPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=\[\]{}|;':",./<>?])[A-Za-z\d!@#$%^&*()_+-=\[\]{}|;':",./<>?]{8,}/

        let checks = [{name:"shelter",pos:2},{name:"admin", pos:4}]
        checks.forEach((item)=>{
            if(!validPassword.test(inputs[item.pos].value))
                error.push(item.name + " password does not meet the requirements (2 special chars or numbers, lower and uppercase letters)")
            else if(inputs[item.pos].value.length < 8 || inputs[item.pos].value.length > 100)
                error.push(item.name + " password is too short or long (should be 8-100 chars)")
            else if(inputs[item.pos].value !== inputs[item.pos+1].value)
                error.push(item.name + " passwords do not match")
        })

        if(inputs[2].value === inputs[4].value)
            error.push("shelter and admin passwords should not be the same")
    }

    showError(error)
    return error.length <= 0;
}

function showError(message){
    let errorBox = document.querySelector("#login-container ." + page + " .error")
    if(message.length === 0){
    }
    else{

    }

    errorBox.innerHTML = message[0] || ""
}
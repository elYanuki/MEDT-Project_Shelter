let shelterName = "will be aquired from the login"
let animalColumns //number of columns currently displayed
let filterData = []

checkLogin()

PopupEngine.init({backgroundColor: "hsl(0, 0%, 12%)", textColor: "hsl(0, 0%, 100%)", elemBackground: "hsl(0, 0%, 8%)"})

function checkLogin(){
    fetch(`./backend/user.php/`)
        .then((response) => {
            return response.json()
        })
        .then(answer=>{
            if(answer.loggedIn !== true){
                window.location.replace(document.location.href + "/login");
            }
            else{
                document.querySelector("nav h1").innerText = answer.name
                shelterName = answer.name
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

getFilterData()
function getFilterData(){
    fetch(`./backend/user.php/getFilterData`)
        .then((response) => {
            return response.json()
        })
        .then(answer=>{
            filterData = answer.data
            console.log(filterData)

            renderAside()
            getAnimals()
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function getAnimals(){
    fetch(`./backend/animal.php/getAllAnimals`)
        .then((response) => {
            return response.json()
        })
        .then(answer=>{
            animalData = answer.data || []

            renderAnimals()
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function editAnimal(){
    PopupEngine.createModal({
        text: "Michael",
        buttons: [{text: "close"}]
    })
}

changeColumnSize(3)
function changeColumnSize(to){
    if(animalColumns === to) return

    document.querySelector(".animals .content").innerHTML = ""
    animalColumns = to
    for (let i = 0; i < to; i++) {
        let col = document.createElement("div")
        col.classList.add("column")
        document.querySelector(".animals .content").appendChild(col)
    }
}

window.addEventListener("resize", (event) => {
    if(window.innerWidth < 600){
        changeColumnSize(1)
    }
    else if(window.innerWidth < 1150){
        changeColumnSize(2)
    }
    else{
        changeColumnSize(3)
    }
});

function addAnimal(){
    const data = {name: "animal", typeID: 1, gender: 0, roomID: 1};
    console.log(data)
    fetch("./backend/animal.php/addAnimal", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data)

            getAnimals()
        })
        .catch((error) => {
            console.error(`Error:`, error);
        });
}

function renderAnimals(sort, ID, breed){
    const path = document.querySelector(".animals .header .path")
    path.innerHTML = `<span onclick="renderAnimals()">all-animals</span>`
    if(sort)
    path.innerHTML += `/ <span onclick="${breed ? `renderAnimals('${sort}', ${ID})` : ''}">${filterData[sort][ID].name}</span>`
    if(breed)
    path.innerHTML += `/ <span>${filterData.breedID[breed].name}</span>`

    document.querySelectorAll(".animals .content .column").forEach((elem) => {
        elem.innerHTML = ""
    })

    animalData.forEach((animal)=>{
        if(sort && parseInt(animal[sort]) !== ID) return
        if(breed && (animal.breedID !== breed || !animal.breedID)) return

        renderAnimal(animal);
    })
}

/**
 * Adds a animal into the html
 * @param data optional json object that contains all the date of the animal you want to add
 */
function renderAnimal(data){
    let birthdateObject = new Date(data.birthdate)

    let processedData = {
        gender: data.gender === 0 ? "male" : "female",
        age: data.birthdate ? Math.abs(new Date(Date.now() - birthdateObject.getTime()).getUTCFullYear() - 1970) : "unknown",
        note: data.note || "",
        owner: data.owner_name || shelterName
    }

    let feedTimeString = ""
    /*data.feedTimes.forEach((item)=>{
        feedTimeString += item
        if(item !== data.feedTimes.at(-1)){
            feedTimeString += " • "
        }
    })*/

    let animal =
        `<section class="animal" data-id="${data.ID}">
            <div class="top">
                <div class="left">
                    <h2 contenteditable="true">${data.name}</h2>
                    <p class="subtext"><span class="link" onclick="editProperty('typeID', this)">${data.type_name}</span> • ${data.breed_name || "unknown"} • ${processedData.gender}</p>
                    <hr class="accent">
                </div>
                <div class="imgbox" style="background-image: ${data.image}"></div>
            </div>

            <div class="bottom">
                <p class="birthdate">
                <span class="label">birthdate</span>${data.birthdate || "unknown"}
                <span class="label"> • age</span>${processedData.age}</p>
                <p class="room"><span class="label">ROOM</span><span class="link">${data.room_name}</span></p>
                <br>
                <p class="food">
                    <span class="label">menu</span>${data.menu || "unkown"}
                    <br><span class="label">feedtimes</span>${feedTimeString}
                </p>
                <br>
                <p class="owner">
                    <span class="label">OWNER</span><span class="link">${data.owner_name}</span>
                    <span class="label"> • Since</span>${data.acquiryDate}
                </p>
                <hr>
                <p class="note" contenteditable="true" spellcheck="false">${processedData.note}</p>
            </div>
        </section>`


    let column = document.querySelector(".animals .content .column")
    document.querySelectorAll(".animals .content .column").forEach((elem) => {
        if (elem.clientHeight < column.clientHeight)
            column = elem
    })
    column.innerHTML += animal
}

let editPopup = document.querySelector("#editPopup")
function editProperty(type, elem){
    let rect = elem.getBoundingClientRect()
    editPopup.style.top = rect.top - document.querySelector("nav").clientHeight + rect.height + "px"
    editPopup.style.left = rect.left - document.querySelector("aside").clientWidth + "px"
}

function renderAside(){
    let html = generateSimpelAside("ownerID", filterData.ownerID)
    html += generateSimpelAside("roomID", filterData.roomID)

    let typeHtml = document.createElement("ul")
    typeHtml.classList.add("types")
    let lastType = -1
    let listItem
    let listObject
    console.log(filterData.typeID)
    filterData.animalTypesAndBreeds.forEach(item => {
        if(item.type_id !== lastType){
            if(listItem)typeHtml.appendChild(listItem)

            lastType = item.type_id
            listItem = document.createElement("li")
            listItem.innerHTML = `<span onclick="renderAnimals('typeID', ${item.type_id})">${item.type_name}</span>`
            listObject = document.createElement("ul")
            listItem.appendChild(listObject)
        }
        listObject.innerHTML += `<li onclick="renderAnimals('typeID', ${item.type_id}, ${item.breed_id})">${item.breed_name}</li>`
    })
    typeHtml.appendChild(listItem)

    document.querySelector("main aside .content").innerHTML = html
    document.querySelector("main aside .content").appendChild(typeHtml)
}

function generateSimpelAside(name, data){
    let items = ""
    data.forEach(item => {
        items += `<li onClick="renderAnimals(${name}, ${item.type_id})">${item.name}</li>`
    })

   return `<ul class="${name}">${items}</ul>`
}
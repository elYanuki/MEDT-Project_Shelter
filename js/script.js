let shelterName = "will be aquired from the login"
let animalColumns //number of columns currently displayed
let filterData = []
let currentFilter = {}
let animalData
let editedAnimals = {}

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

            renderAside()
            selectAside("roomID", document.querySelector('main aside .buttons.top button'))
            getAnimals()
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function getAnimals(){
    return fetch(`./backend/animal.php/getAllAnimals`)
        .then((response) => {
            return response.json()
        })
        .then(answer=>{
            animalData = answer.data || []

            changeColumnSize(3)
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function changeColumnSize(to){
    if(animalColumns === to) return

    animalColumns = to

    document.querySelector(".animals .content").innerHTML = ""
    for (let i = 0; i < to; i++) {
        let col = document.createElement("div")
        col.classList.add("column")
        document.querySelector(".animals .content").appendChild(col)
    }
    document.querySelector(".animals .content").style.gridTemplateColumns = `repeat(${to}, minmax(0, 1fr))`


    refreshAnimalRender()
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
    const data = {name: "animal", typeID: currentFilter.sort === "typeID" ? currentFilter.ID : 1, breedID: currentFilter.breed || 0, gender: 0, roomID: currentFilter.sort === "roomID" ? currentFilter.ID : 0, ownerID: currentFilter.sort === "ownerID" ? currentFilter.ID : 0};

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
            return getAnimals()
        })
        .then((data) => {
            refreshAnimalRender()
        })
        .catch((error) => {
            console.error(`Error:`, error);
        });
}

function refreshAnimalRender(){
    renderAnimals(currentFilter.sort, currentFilter.ID, currentFilter.breed)
}

indicators = {typeID: '<i class="fa-solid fa-paw"></i>', ownerID: '<i class="fa-solid fa-person"></i>', roomID: '<i class="fa-solid fa-house-chimney fa-sm"></i>'}
function renderAnimals(sort, ID, breed){
    //todo save changes to server on filter change so that joins will run and on column resize
    currentFilter = {sort: sort, ID: ID, breed: breed}
    let selectedName
    //set new path
    const path = document.querySelector(".animals .header .path")
    path.innerHTML = `<span onclick="renderAnimals()">all-animals</span>`
    if(sort) {
        path.innerHTML += ` / <span onclick="${breed ? `renderAnimals('${sort}', ${ID})` : ''}">${indicators[sort]} ${filterData[sort][ID].name}</span>`
        selectedName = filterData[sort][ID].name
    }
    if(breed) {
        path.innerHTML += ` / <span>${filterData.breedID[breed].name}</span>`
        selectedName = filterData.breedID[breed].name
    }
    //highlight selected item in sidebar
    document.querySelectorAll("aside .content li.selected")?.forEach((item) => {
        item.classList.remove("selected")
    })

    if(selectedName) {
        document.querySelectorAll(`aside .content .${sort} li`).forEach((item) => {
            if (item.innerHTML === selectedName || item.querySelector("span")?.innerHTML === selectedName) {
                item.classList.add("selected")
            }
        })
    }

    //render all animals that are in the filter
    document.querySelectorAll(".animals .content .column").forEach((elem) => {
        elem.innerHTML = ""
    })

    Object.entries(animalData).forEach((item)=>{
        const [key, animal] = item;
        if(sort && parseInt(animal[sort]) !== ID) return
        if(breed && (parseInt(animal.breedID) !== breed || !animal.breedID)) return

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

    console.log(data.breed_name)

    let animal =
        `<section class="animal" data-id="${data.ID}">
            <div class="top">
                <div class="left">
                    <h2 contenteditable="true">${data.name}</h2>
                    <p class="subtext">
                        <span class="link" onclick="editProperty('typeID', this)">${data.type_name}</span> • 
                        <span class="link breed" onclick="editProperty('breedID', this)">${data.breed_name || "unknown"}</span> • 
                        <span class="link" onclick="editProperty('gender', this)">${processedData.gender}</span>
                    </p>
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
let clickedElem
let editingAnimalID
let editingProperty
let currentAnimal
function editProperty(prop, elem){
    clickedElem = elem
    editingAnimalID = elem.closest(".animal").dataset.id
    editingProperty = prop
    currentAnimal = editedAnimals[editingAnimalID] || animalData[editingAnimalID]

    //position popup
    let rect = elem.getBoundingClientRect()
    editPopup.style.top = rect.top - document.querySelector("nav").clientHeight + rect.height + "px"
    editPopup.style.left = rect.left - document.querySelector("aside").clientWidth + "px"
    editPopup.classList.add("active")

    //create content
    let html = ""

    if(prop === "breedID") {
        Object.entries(filterData['breedID']).forEach(item => {
            const [key, value] = item;
            if(value.animal_type_ID === currentAnimal.typeID)
                html += `<p onclick="confirmEdit('${prop}', '${value.ID}')">${value.name}</p>`
        })
    }
    else{
        Object.entries(filterData[prop]).forEach(item => {
            const [key, value] = item;
            html += `<p onclick="confirmEdit('${prop}', '${value.ID}')">${value.name}</p>`
        })
    }

    editPopup.innerHTML = html

    document.body.addEventListener('click', closeEditProperty);
}

function confirmEdit(type, ID){
    editPopup.classList.remove("active")

    document.body.removeEventListener('click', closeEditProperty);

    if(!type) return

    clickedElem.innerText = filterData[type][ID].name

    let animalHtml = clickedElem.closest(".animal")
    if(type === 'typeID' && currentAnimal[type] !== ID){
        currentAnimal['breedID'] = undefined
        animalHtml.querySelector('.breed').innerText = "unknown"
    }

    currentAnimal[type] = ID

    editedAnimals[editingAnimalID] = currentAnimal
}

function closeEditProperty(event){
    if(!editPopup.contains(event.target) && !clickedElem.contains(event.target)) {
        confirmEdit()
    }
}

function selectAside(sort, elem){
    document.querySelectorAll(`main aside .content ul.selected`).forEach((item)=>{
        item.classList.remove("selected")
    })
    document.querySelector(`main aside .content ul.${sort}`).classList.add("selected")

    document.querySelectorAll(`main aside .buttons.top button.selected`).forEach((item)=>{
        item.classList.remove("selected")
    })
    elem.classList.add("selected")
}
function renderAside(){
    //todo add no owner / no room, (add button) - for owner
    let html = generateSimpelAside("ownerID", filterData.ownerID)
    console.log(filterData.ownerID)
    html += generateSimpelAside("roomID", filterData.roomID)

    let typeHtml = document.createElement("ul")
    typeHtml.classList.add("typeID")
    let lastType = -1
    let listItem
    let listObject
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
    Object.entries(data).forEach(item => {
        const [key, value] = item;
        items += `<li onclick="renderAnimals('${name}', ${value.ID})">${value.name}</li>`
    })

   return `<ul class="${name}">${items}</ul>`
}
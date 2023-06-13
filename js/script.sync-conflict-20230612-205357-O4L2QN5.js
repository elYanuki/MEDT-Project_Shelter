let shelterName = "will be aquired from the login"
let animalColumns //number of columns currently displayed
let filterData = []
let currentFilter = {}
let animalData
let editedAnimals = {}

checkLogin()

PopupEngine.init({backgroundColor: "hsl(0, 0%, 12%)", textColor: "hsl(0, 0%, 100%)", elemBackground: "hsl(0, 0%, 8%)", defaultNotificationLifetime: 2000},)

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
                getFilterData()
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function getFilterData(){
    fetch(`./backend/user.php/getFilterData`)
        .then((response) => {
            return response.json()
        })
        .then(answer=>{
            filterData = answer.data
            filterData["gender"] = {0: {name: "female", ID: 0}, 1: {name: "male", ID: 1}}
            filterData["ownerID"][0] = {name: shelterName, ID: 0}

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

            checkScreenSize()
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

window.addEventListener("resize", checkScreenSize);

function checkScreenSize(){
    if(window.innerWidth < 600){
        changeColumnSize(1)
    }
    else if(window.innerWidth < 1150){
        changeColumnSize(2)
    }
    else{
        changeColumnSize(3)
    }
}

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

    PopupEngine.createNotification({text: "created new animal", position: ["bottom", "right"]})
}

function refreshAnimalRender(){
    renderAnimals(currentFilter.sort, currentFilter.ID, currentFilter.breed)
}

indicators = {
    typeID: '<i class="fa-solid fa-paw"></i>',
    ownerID: '<i class="fa-solid fa-person"></i>',
    roomID: '<i class="fa-solid fa-house-chimney fa-sm"></i>'
}

function renderAnimals(sort, ID, breed) {
    updateServer()
    getAnimals().then(() => {

        currentFilter = {sort: sort, ID: ID, breed: breed}
        let selectedName
        //set new path
        const path = document.querySelector(".animals .header .path")
        path.innerHTML = `<span onclick="renderAnimals()">all-animals</span>`
        if (sort) {
            path.innerHTML += ` / <span onclick="renderAnimals('${sort}', ${ID})">${indicators[sort]} ${filterData[sort][ID].name}</span>`
            selectedName = filterData[sort][ID].name
        }
        if (breed) {
            path.innerHTML += ` / <span onclick="refreshAnimalRender()">${filterData.breedID[breed].name}</span>`
            selectedName = filterData.breedID[breed].name
        }
        //highlight selected item in sidebar
        document.querySelectorAll("aside .content li.selected")?.forEach((item) => {
            item.classList.remove("selected")
        })

        if (selectedName) {
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

        Object.entries(animalData).forEach((item) => {
            const [key, animal] = item;
            if (sort && parseInt(animal[sort]) !== ID) return
            if (breed && (parseInt(animal.breedID) !== breed || !animal.breedID)) return

            renderAnimal(animal);
        })
    })
}

/**
 * Adds a animal into the html
 * @param data optional json object that contains all the date of the animal you want to add
 */
function renderAnimal(data){
    let birthdateObject = new Date(data.birthdate)
    let isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/

    let processedData = {
        gender: filterData.gender[data.gender].name,
        age: data.birthdate === "0000-00-00" ? "unknown" : new Date().getFullYear() - birthdateObject.getFullYear(),
        note: data.note || "",
        food: data.food || "",
        owner: data.owner_name || shelterName,
        birthdate: data.birthdate === "0000-00-00" ? "unknown" : data.birthdate
    }

    console.log(data.name, data.birthdate, processedData.age)

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
                    <h2 contenteditable="true" onblur="editProperty('name', this)">${data.name}</h2>
                    <p class="subtext">
                        <span class="link" onclick="editPropertyDropdown('typeID', this)">${data.type_name}</span> • 
                        <span class="link breed" onclick="editPropertyDropdown('breedID', this)">${data.breed_name || "unknown"}</span> • 
                        <span class="link" onclick="editPropertyDropdown('gender', this)">${processedData.gender}</span>
                    </p>
                    <hr class="accent">
                </div>
                <div class="imgbox" style="background-image: ${data.image}"></div>
            </div>

            <div class="bottom">
                <p class="birthdate">
                <span class="label">birthdate</span><span class="link" onclick="editPropertyDropdown('birthdate', this)">${processedData.birthdate}</span>
                <span class="label"> • age</span><span data-popup-text="this property is auto calculated" class="age">${processedData.age}</span></p>
                <p class="room">
                    <span class="label">ROOM</span>
                    <span class="link" onclick="editPropertyDropdown('roomID', this)">${data.room_name}</span>
                </p>
                <br>
                <p>
                    <span class="label">menu</span>
                    <p class="food" contenteditable="true" spellcheck="false" onblur="editProperty('food', this)">${processedData.food}</p>
                </p>
                <br>
                <p class="owner">
                    <span class="label">OWNER</span><span class="link" onclick="editPropertyDropdown('ownerID', this)">${processedData.owner}</span>
                    <span class="label"> • Since</span><span class="link" onclick="editPropertyDropdown('acquirydate', this)">${data.acquiryDate}</span>
                </p>
                <hr>
                <p class="note" contenteditable="true" spellcheck="false" onblur="editProperty('note', this)">${processedData.note}</p>
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
function editPropertyDropdown(prop, elem){
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

    editPopup.innerHTML = ""
    editPopup.style.gridTemplateColumns = "auto"
    switch (prop) {
        case "breedID":
            Object.entries(filterData['breedID']).forEach(item => {
                const [key, value] = item;
                if(value.animal_type_ID === currentAnimal.typeID)
                    html += `<p onclick="confirmPropertyDropdown('breedID', '${value.ID}')">${value.name}</p>`
            })
            break
        case "birthdate":
        case "acquirydate":
            let datePick = document.createElement("input")
            html = `<div class="confirm"><i class="fa-solid fa-check" onclick="confirmPropertyDropdown('${prop}')"></i></div>`
            datePick.type = "date"
            datePick.id = "datepicker"
            editPopup.style.gridTemplateColumns = "auto auto"
            editPopup.appendChild(datePick)
            break
        default:
            Object.entries(filterData[prop]).forEach(item => {
                const [key, value] = item;
                html += `<p onclick="confirmPropertyDropdown('${prop}', '${value.ID}')">${value.name}</p>`
            })
            break
    }

    editPopup.innerHTML += html

    document.body.addEventListener('click', closePropertyDropdown);
}

/**
 * closes the edit popup and sets the values
 * @param prop property to be set - type, name, etc.
 * @param ID new value ID of the property
 */
function confirmPropertyDropdown(prop, ID){
    editPopup.classList.remove("active")

    document.body.removeEventListener('click', closePropertyDropdown);

    if(!prop) return

    let animalHtml = clickedElem.closest(".animal")
    if(prop === 'typeID' && currentAnimal[prop] !== ID){
        currentAnimal['breedID'] = null
        animalHtml.querySelector('.breed').innerText = "unknown"
    }

    if(["acquirydate", "birthdate"].includes(prop)){
        clickedElem.innerText = document.querySelector("#datepicker").value
        currentAnimal[prop] = document.querySelector("#datepicker").value
        currentAnimal.age = new Date().getFullYear() - new Date(currentAnimal.birthdate).getFullYear()
        animalHtml.querySelector(".age").innerText = currentAnimal.age
    }
    else{
        clickedElem.innerText = filterData[prop][ID].name
        currentAnimal[prop] = ID
    }

    editedAnimals[editingAnimalID] = currentAnimal
}

function closePropertyDropdown(event){
    if(!editPopup.contains(event.target) && !clickedElem.contains(event.target)) {
        confirmPropertyDropdown()
    }
}

function editDateDropdown(prop, elem){
    document.querySelector('#datePick').showPicker()
}

function editProperty(prop, elem){
    editingAnimalID = elem.closest(".animal").dataset.id
    currentAnimal = editedAnimals[editingAnimalID] || animalData[editingAnimalID]

    if(elem.innerHTML === "")return

    currentAnimal[prop] = elem.innerHTML
    editedAnimals[editingAnimalID] = currentAnimal
}

function updateServer(){
    if(Object.keys(editedAnimals).length === 0) return
    fetch("./backend/animal.php/updateAnimals", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedAnimals),
    })
        .then((response) => {
            return response.text()
        })
        .then((answer) => {
            console.log(answer)
            editedAnimals = {}
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

setInterval(updateServer, 5000)

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
    let html = ""

    let items = ""
    Object.entries(filterData.ownerID).forEach(item => {
        const [key, value] = item;
        if(value.ID !== 0)
            items += `<li onclick="renderAnimals('ownerID', ${value.ID})">${value.name}</li>`
    })
    html += `<ul class="ownerID">${items}<li class="last" onclick="renderAnimals('ownerID', ${filterData.ownerID[0].ID})">${filterData.ownerID[0].name}</li></ul>`

    items = ""
    Object.entries(filterData.roomID).forEach(item => {
        const [key, value] = item;
        items += `<li onclick="renderAnimals('roomID', ${value.ID})">${value.name}</li>`
    })
    html += `<ul class="roomID">
                ${items}
                <li class="last" onclick="renderAnimals('roomID', ${filterData.ownerID[0].ID})">${filterData.ownerID[0].name}</li>
            </ul>`

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

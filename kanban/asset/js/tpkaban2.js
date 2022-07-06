

// Pourquoi quand je deplace mon post-it il se met dans "section" plutot que dans "article" de DONE et VERIFIED.
// Le deplacement des post-it est laborieux ils ne se cumulent pas dans DONE et VERIFIED.
// Quand je deplace mes post-it ils ce n'est pas forcement celui que je deplace, qui se deplace.
// Supprimer un post-it ne marche qu'une fois, j'ai tester la fonction dans et a l'exterieur du premier evenement.

// Pourquoi quand je deplace mon post-it il se met dans "section" plutot que dans "article" de DONE et VERIFIED.
// Le deplacement des post-it est laborieux ils ne se cumulent pas dans DONE et VERIFIED.
// Quand je deplace mes post-it ils ce n'est pas forcement celui que je deplace, qui se deplace.
// Supprimer un post-it ne marche qu'une fois, j'ai tester la fonction dans et a l'exterieur du premier evenement.

//---------------declaration-des-variables---------------


let elementToDelete;
let main = document.querySelector("main");
let dropTarget = document.querySelectorAll(".droptarget");
let touteLesSections = document.querySelectorAll(".deplace");

let inputTitle = document.querySelector(".input-title-note");
let inputContent = document.querySelector(".input-content-note");
let buttonValider = document.querySelector(".button-valider");
let titleToDo = document.querySelector(".title-to-do");
let articleToDo = document.querySelector(".article-to-do");
let statut = document.querySelectorAll("h2");

let garbage = document.querySelector(".garbage");
let note;
let idIncrement = 0;
let notesTab = [];


//------------------creation-de-la-Date-------------------

let date = new Date();
let dateDujour = date.toLocaleString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

//--------------debut-de-l-evenement-cliqué-------------



buttonValider.addEventListener("click", function () {

    //--------------creation-du-post-it---------------

    createNote();


    //------------local-storage- declaration-de-variable------------ 

    let newNote = {
        // statut: statut.value;
        titre: inputTitle.value,
        para: inputContent.value,
        datejour: dateDujour
    };
    //------------------vider-les-input------------------

    inputTitle.value = "";
    inputContent.value = "";

    //---------------------drag-and-drop------------------

    note.setAttribute("draggable", "true")

    note.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData("application/my-app", e.target.id);
    });

    note.addEventListener('dragend', function () { });

    for (let boite of touteLesSections) {
        boite.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        });

        boite.addEventListener('dragenter', function (e) {
            e.preventDefault();
        });

        boite.addEventListener('dragleave', function () { });

        boite.addEventListener('drop', function (e) {
            let data = e.dataTransfer.getData("application/my-app");
            e.target.appendChild(document.getElementById(data));
        });
    }
    //------------------local-storage-execution--------------- 

    pushNote(newNote);
    save(notesTab);
    
    
    // charge()  
})
//------------------------delete--------------------------
//Data 
garbage.addEventListener('drop', function (e) {
    let data = e.dataTransfer.getData("application/my-app");
    document.getElementById(data).remove();
    console.log(data);
})

garbage.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
});


//------------------local-storage-fonction-----------------

function save(notesTab) {
    localStorage.setItem(`tabstorage`, `${JSON.stringify(notesTab)}`);
}

function charge() {
    JSON.parse(localStorage.getItem(`tabstorage`));
}

function pushNote(newNote) {
    notesTab.push(newNote)
}

let h4Note;
let pNote;
let dateNote;
// console.log(JSON.parse(localStorage.getItem(`tabstorage`)));

function createNote() {

    createBloc();

    h4Note.textContent = inputTitle.value;
    pNote.textContent = inputContent.value;
    dateNote.textContent = dateDujour;
}

function createNoteLS(note) {

    createBloc();
    h4Note.textContent = note.titre;
    pNote.textContent = note.para;
    dateNote.textContent = dateDujour;

}


function createBloc() {
    note = document.createElement("div");
    note.setAttribute("id", ++idIncrement);
    articleToDo.append(note);
    note.classList.add("div-note");
    note.style.zIndex = 1000;

    h4Note = document.createElement("h4");
    note.append(h4Note);
    h4Note.classList.add("h4-note");

    pNote = document.createElement("p");
    note.append(pNote);
    pNote.classList.add("p-note");

    dateNote = document.createElement("p");
    note.append(dateNote);
    dateNote.classList.add("date-note");
}


if (JSON.parse(localStorage.getItem(`tabstorage`)) != null) {
    notesTab = JSON.parse(localStorage.getItem(`tabstorage`));

    notesTab.forEach(function (note) {
        createNoteLS(note)
    });
}

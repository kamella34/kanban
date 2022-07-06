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
let statut = document.querySelectorAll(".statut");
let sectionToDo = document.querySelector(".sectionToDo");
let sectionDone = document.querySelector(".sectionDone");
let sectionVerified = document.querySelector(".sectionVerified");

let garbage = document.querySelector(".garbage");
let note;
let idIncrement = 0;
let notesTab = [];

let h4Note;
let pNote;
let dateNote;
let myId = 0;
let date;
let div = document.querySelector(".div-note");
let changeColonne;
let data;




// console.log(statut);
//------------------creation-de-la-Date-------------------
function tranformDate(date) {
    date = new Date(date);
    return date.toLocaleString('fr-FR', {
        minute: 'numeric',
        hour: 'numeric',
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

//--------------debut-de-l-evenement-cliqué-------------

buttonValider.addEventListener("click", function () {
    //------------local-storage- declaration-de-variable------------ 

    let newNote = {
        id: myId,
        statut: "TO DO",
        titre: inputTitle.value,
        para: inputContent.value,
        datejour: new Date()
    };
    //--------------creation-du-post-it---------------

    createNote(newNote);


    //------------------vider-les-input------------------

    inputTitle.value = "";
    inputContent.value = "";

    //------------------local-storage-execution--------------- 

    pushNote(newNote);
    save(notesTab);

})
//------------------------FIN-DE-L'EVENEMENT------------------------------------






//---------------------drag-and-drop------------------

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
//------------------------delete--------------------------

garbage.addEventListener('drop', function (e) {
    //je recupere les donées de la note que j'ai attrapé (dragstart)
    data = e.dataTransfer.getData("application/my-app");
    document.getElementById(data).remove();
  
    console.log("drop")
    notesTab[data - 1].statut = "delete";
    console.log(notesTab[data - 1]);  
    save(notesTab)
})

garbage.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";


});
//--------------------------------------------------------




//-------------------fonction-----------------

function save(notesTab) {
    localStorage.setItem(`tabstorage`, `${JSON.stringify(notesTab)}`);
}

function charge() {
    JSON.parse(localStorage.getItem(`tabstorage`));
}

function pushNote(newNote) {
    notesTab.push(newNote)
}

console.log(JSON.parse(localStorage.getItem(`tabstorage`)));

function createNote(note) {

    createBloc(note);

    h4Note.textContent = note.titre;
    pNote.textContent = note.para;
    dateNote.textContent = tranformDate(new Date());
}



function createNoteLS(note) {

    if (note.statut == "delete"){
        idIncrement++
    }else{
    createBloc(note);

    h4Note.textContent = note.titre;
    pNote.textContent = note.para;
    dateNote.textContent = tranformDate(note.datejour);
}

}







function createBloc(NoteEnCourCrea) {
    note = document.createElement("div");

    note.setAttribute("id", ++idIncrement);
    myId = note.getAttribute("id");

    quelColonne(NoteEnCourCrea.statut);
    changeColonne.append(note);
    note.classList.add("div-note");

    h4Note = document.createElement("h4");
    note.append(h4Note);
    h4Note.classList.add("h4-note");

    pNote = document.createElement("p");
    note.append(pNote);
    pNote.classList.add("p-note");

    dateNote = document.createElement("p");
    note.append(dateNote);
    dateNote.classList.add("date-note");

    //-----------drag--and--drop--------------------
    note.setAttribute("draggable", "true");

    note.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData("application/my-app", e.target.id);
        //je recup les info de la note pour pouvoir la deplacer

    });

    note.addEventListener('dragend', function () { });

    //-----------drag--and--drop--FIN------------------
}

function quelColonne(statut) {
    if (statut == "TO DO") {
        changeColonne = sectionToDo
    } else if (statut == "DONE") {
        changeColonne = sectionDone
    } else if (statut == "VERIFIED") {
        changeColonne = sectionVerified
    } 
}

//-----------------------------local--storage----------------

if (JSON.parse(localStorage.getItem(`tabstorage`)) != null) {
    notesTab = JSON.parse(localStorage.getItem(`tabstorage`));

    notesTab.forEach(function (note) {
        createNoteLS(note);
    });
}






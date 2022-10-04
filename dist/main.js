"use strict";
let notesString = localStorage.getItem("notes");
let notes;
if (notesString == null)
    notes = [];
else
    notes = JSON.parse(notesString);
fillTable();
function fillTable() {
    let tablebody = document.getElementById("tableBody");
    while (tablebody.firstChild) {
        tablebody.removeChild(tablebody.firstChild);
    }
    notes.forEach((note) => {
        let row = tablebody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = note.description;
        cell2.innerHTML = note.content;
        cell3.innerHTML = `<button class="btn btn-danger" onclick="removeNote(${note.id})">Delete</button>`;
        cell4.innerHTML = `<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-info"  onclick="editNote(${note.id})">Edit</button>`;
    });
    saveNote();
}
function saveNote() {
    let description = document.getElementById("description");
    let content = document.getElementById("content");
    let saveButton = document.getElementById("guardar");
    saveButton.onclick = () => {
        if (description && content && description.value.length > 0 && content.value.length > 0) {
            let newNote = {
                description: description.value.trim(),
                content: content.value.trim(),
                id: Date.now()
            };
            notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(notes));
            fillTable();
        }
        else {
            alert("Description and content are required");
        }
    };
}
function removeNote(id) {
    let confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
        let newNotes = notes.filter((note) => note.id != id);
        notes = newNotes;
        localStorage.setItem("notes", JSON.stringify(notes));
        fillTable();
    }
}
function editNote(id) {
    let note = notes.find(nota => nota.id == id);
    let description = document.getElementById("description");
    let content = document.getElementById("content");
    if (note) {
        description.value = note.description;
        content.value = note.content;
    }
    let editButton = document.getElementById("guardar");
    editButton.onclick = () => {
        if (note && description && content && description.value.trim().length > 0 && content.value.trim().length > 0) {
            note.description = description.value.trim();
            note.content = content.value.trim();
            localStorage.setItem("notes", JSON.stringify(notes));
            fillTable();
        }
        else {
            alert("Description and content are required");
            fillTable();
        }
    };
}
document.getElementById("description")?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("guardar")?.click();
    }
});
document.getElementById("content")?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("guardar")?.click();
    }
});
let modal = document.getElementById("staticBackdrop");
modal.addEventListener('hidden.bs.modal', function () {
    let description = document.getElementById("description");
    let content = document.getElementById("content");
    description.value = "";
    content.value = "";
});

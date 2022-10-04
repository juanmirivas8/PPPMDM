interface Note {
    description: string;
    content: string;
    id?: number;
}
let notesString:string|null = localStorage.getItem("notes");
let notes:Note[];
if(notesString == null) notes = [];
else notes = JSON.parse(notesString);

fillTable();

function fillTable(){
    let tablebody:HTMLTableSectionElement = document.getElementById("tableBody") as HTMLTableSectionElement;

    while (tablebody.firstChild) {
        tablebody.removeChild(tablebody.firstChild);
    }
        
    notes.forEach((note:Note) => {
        let row:HTMLTableRowElement = tablebody.insertRow();
        let cell1:HTMLTableCellElement = row.insertCell(0);
        let cell2:HTMLTableCellElement = row.insertCell(1);
        let cell3:HTMLTableCellElement = row.insertCell(2);
        let cell4:HTMLTableCellElement = row.insertCell(3);
        cell1.innerHTML = note.description;
        cell2.innerHTML = note.content;
        cell3.innerHTML = `<button class="btn btn-danger" onclick="removeNote(${note.id})">Delete</button>`;
        cell4.innerHTML = `<button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-info"  onclick="editNote(${note.id})">Edit</button>`;
    });
    saveNote();
}

function saveNote(){
    let description:HTMLInputElement = document.getElementById("description") as HTMLInputElement;
    let content:HTMLInputElement = document.getElementById("content") as HTMLInputElement;
    let saveButton:HTMLButtonElement = document.getElementById("guardar") as HTMLButtonElement;
    saveButton.onclick = () => {
        if (description && content && description.value.length > 0 && content.value.length > 0){
                let newNote:Note = {
                    description: description.value.trim(),
                    content: content.value.trim(),
                    id : Date.now()
                }
                notes.push(newNote);
                localStorage.setItem("notes",JSON.stringify(notes));
                fillTable();
        }else{
            alert("Description and content are required");
        }
    } 
 }

 function removeNote(id:number):void{
    let confirmed:boolean = confirm("Are you sure you want to delete this note?");
    if(confirmed){
        let newNotes = notes.filter((note:Note) => note.id != id);
        notes=newNotes;
        localStorage.setItem("notes",JSON.stringify(notes));
        fillTable();
    }
 }

 function editNote(id:number){

    let note:Note|undefined = notes.find(nota =>nota.id == id);
    let description:HTMLInputElement =document.getElementById("description") as HTMLInputElement;
    let content:HTMLInputElement= document.getElementById("content") as HTMLInputElement;

    if(note){
        description.value = note.description;
        content.value = note.content;
    }

    let editButton:HTMLButtonElement = document.getElementById("guardar") as HTMLButtonElement;
    editButton.onclick = () => {
        if(note&&description && content&&description.value.trim().length > 0 && content.value.trim().length > 0){
            note.description = description.value.trim();
            note.content = content.value.trim();
            localStorage.setItem("notes",JSON.stringify(notes));
            fillTable();
        }else{
            alert("Description and content are required");
            fillTable();
        }
    }
 }

document.getElementById("description")?.addEventListener("keypress",(event)=>{
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        
      document.getElementById("guardar")?.click();
    }
 })

 document.getElementById("content")?.addEventListener("keypress",(event)=>{
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        
      document.getElementById("guardar")?.click();
    }
 })

 let modal:HTMLElement = document.getElementById("staticBackdrop") as HTMLElement;
    modal.addEventListener('hidden.bs.modal', function () {
        let description:HTMLInputElement = document.getElementById("description") as HTMLInputElement;
        let content:HTMLInputElement = document.getElementById("content") as HTMLInputElement;
        description.value = "";
        content.value = "";
    })
    
   
    
 
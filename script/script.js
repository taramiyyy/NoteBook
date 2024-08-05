function popup() {
    const popupContainer = document.createElement("div");
    popupContainer.innerHTML = `
        <div id="popupContainer">
            <h1>افزودن یادداشت</h1>
            <textarea id="fname" placeholder="عنوان یادداشت"></textarea>
            <textarea id="note-text" placeholder="یادداشت خود را بنویسید..."></textarea>
            <div id="btn-container">
                <button id="submitBtn" onclick="createNote()"><box-icon name='calendar-check' color='#8ba0a4' ></box-icon></button>
                <button id="closeBtn" onclick="closePopup()"><box-icon name='window-close' color='#1b4552' ></box-icon></button>
            </div>
        </div>
    `;

    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim() !== '') {
        const note = {
            id: new Date().getTime(),
            text: noteText
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementById('note-text').value = '';

        closePopup();
        displayNotes();
    }
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${note.text}</span>
            <div id="noteBtns-container">
                <button id="editBtn" onclick="editNote(${note.id})">ویرایش</button>
                <button id="deleteBtn" onclick="deleteNote(${note.id})">حذف</button>
            </div>
        `;
        notesList.appendChild(listItem);
    });
}

function editNote(noteId) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id === noteId);
    const noteText = noteToEdit ? noteToEdit.text : '';
    const editingPopup = document.createElement("div");

    editingPopup.innerHTML = `
        <div id="editing-container" data-note-id="${noteId}">
            <h1>ویرایش متن</h1>
            <textarea id="note-text">${noteText}</textarea>
            <div id="btn-container">
                <button id="submitBtn" onclick="updateNote()">انجام شد</button>
                <button id="closeBtn" onclick="closeEditPopup()">انجام نشود</button>
            </div>
        </div>
    `;
    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote() {
    const noteText = document.getElementById('note-text').value.trim();
    const editingPopup = document.getElementById('editing-container');

    if (noteText !== '') {
        const noteId = editingPopup.getAttribute('data-note-id');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updatedNotes = notes.map(note => {
            if (note.id == noteId) {
                return { id: note.id, text: noteText };
            }
            return note;
        });

        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        closeEditPopup();

        displayNotes();
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();

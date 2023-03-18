function openNotepad(titleText = "", noteText = "", dateText = "") {
  // Create notepad elements
  var notepad = document.createElement("div");
  notepad.classList.add("notepad");
  var title = document.createElement("div");
  title.classList.add("title");
  title.textContent = "Notepad";

  var maxLength = 20;

  var titleTextArea = document.createElement("textarea");
  titleTextArea.placeholder = "Enter title...";
  titleTextArea.maxLength = maxLength;
  titleTextArea.classList.add("title");
  titleTextArea.classList.add("title-textarea");
  titleTextArea.value = titleText;
  title.appendChild(titleTextArea);

  // var clearButton = document.createElement('button');
  // clearButton.classList.add('button');
  // clearButton.textContent = 'Clear';
  // clearButton.addEventListener('click', function() {
  //   // Clear textarea
  //   text.value = '';
  // });
  // title.appendChild(clearButton);

  // Add a label to display the remaining characters
  var charsLeftLabel = document.createElement("label");
  charsLeftLabel.classList.add("label");
  charsLeftLabel.textContent = `${
    maxLength - titleTextArea.value.length
  }/${maxLength}`;
  title.appendChild(charsLeftLabel);

  // Add an event listener to update the label when the user types
  titleTextArea.addEventListener("input", function () {
    charsLeftLabel.textContent = `${
      maxLength - titleTextArea.value.length
    }/${maxLength}`;
  });

  var text = document.createElement("textarea");
  text.classList.add("text");
  text.value = noteText; // Set textarea value

  // Create save button
  var saveButton = document.createElement("button");
  saveButton.classList.add("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    // Get title and text content
    var titleText = titleTextArea.value;
    var noteText = text.value;

    // Save note to local storage
    var notes = JSON.parse(localStorage.getItem("notes")) || [];
    // COME HERE
    var date = new Date();
    notes.push({ title: titleText, text: noteText, date: date });
    localStorage.setItem("notes", JSON.stringify(notes));

    // Create note element and add to sidebar
    var noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.textContent = titleText;
    noteElement.setAttribute("title", noteText);

    // Create span element for time
    var dateSpan = document.createElement("span");
    dateSpan.classList.add("date");

    // Get current date and time
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    // Format time
    var formattedTime =
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes;

    // Set text content to time only
    dateSpan.textContent = formattedTime;
    noteElement.appendChild(dateSpan);
    // *!mycode start
    // const deleteButton = `<button class="side-del">x</button>`;
    // noteElement.insertAdjacentHTML("beforeend",deleteButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("side-del");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation(); // prevent the note from being opened
      const parentNote = noteElement.parentElement;
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const index = notes.findIndex(
        (note) => note.title === titleText && note.text === noteText
      );
      if (index > -1) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteElement.remove();
      }
    });

    noteElement.appendChild(deleteButton);

    // *!mycode end`

    noteElement.addEventListener("click", function () {
      openNotepad(titleText, noteText);
    });
    document.querySelector(".sidebar").appendChild(noteElement);

    // Clear notepad and close it
    titleTextArea.value = "";
    text.value = "";
    text.readOnly = true;
    notepad.parentNode.removeChild(notepad);
  });

  var closeButton = document.createElement("button");
  closeButton.classList.add("button");
  closeButton.classList.add("close");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", function () {
    notepad.parentNode.removeChild(notepad);
  });

  // Add elements to notepad
  title.appendChild(closeButton);
  notepad.appendChild(title);
  notepad.appendChild(text);
  notepad.appendChild(saveButton);

  // Add notepad to page
  document.body.appendChild(notepad);

  // Set focus to title textarea
  titleTextArea.focus();
  // document.querySelector('.sidebar').appendChild(noteElement);
}

// Retrieve notes from local storage
var notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to render a note element in the sidebar
function renderNoteElement(note) {
  var noteElement = document.createElement("div");
  noteElement.classList.add("note");
  noteElement.textContent = note.title;
  noteElement.setAttribute("title", note.text);

  // Create span element for time
  var dateSpan = document.createElement("span");
  dateSpan.classList.add("date");

  // Get current date and time
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  // Format time
  var formattedTime =
    (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;

  // Set text content to time only
  dateSpan.textContent = formattedTime;
  noteElement.appendChild(dateSpan);

  // Add a delete button to the note element
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("side-del");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the note from being opened
    var index = notes.indexOf(note);
    if (index > -1) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteElement.remove();
    }
  });
  noteElement.appendChild(deleteButton);

  // Add a click event listener to open the note in the notepad
  noteElement.addEventListener("click", function () {
    openNotepad(note.title, note.text);
  });

  return noteElement;
}

// Render each note in the sidebar
var sidebar = document.querySelector(".sidebar");
notes.forEach(function (note) {
  var noteElement = renderNoteElement(note);
  sidebar.appendChild(noteElement);
});

// Add event listener to clear button
document.getElementById("clear-storage").addEventListener("click", function () {
  // Clear local storage
  localStorage.clear();

  // Remove all note elements from the sidebar
  while (sidebar.firstChild) {
    sidebar.removeChild(sidebar.firstChild);
  }
});

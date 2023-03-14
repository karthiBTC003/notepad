
function openNotepad(titleText = '', noteText = '') {
  // Create notepad elements
  var notepad = document.createElement('div');
  notepad.classList.add('notepad');
  var title = document.createElement('div');
  title.classList.add('title');
  title.textContent = "Notepad";
  var titleTextArea = document.createElement('textarea');
  titleTextArea.placeholder = 'Enter title...';
  titleTextArea.classList.add('title');
  titleTextArea.classList.add('title-textarea');
  titleTextArea.value = titleText;
  title.appendChild(titleTextArea);


  var text = document.createElement('textarea');
  text.classList.add('text');
  text.value = noteText; // Set textarea value



  var saveButton = document.createElement('button');
  saveButton.classList.add('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', function () {
    // Get title and text content
    var titleText = titleTextArea.value;
    var noteText = text.value;

    // Create note element and add to sidebar
    var note = document.createElement('div');
    note.classList.add('note');
    note.textContent = titleText;
    note.setAttribute('title', noteText);


    
// Create span element for date and time
var dateSpan = document.createElement('span');
dateSpan.classList.add('date');

// Get current date and time
var currentDate = new Date();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();

// Format time
var formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;



// Set text content to time only
dateSpan.textContent = formattedTime;

 // Add date span to note element
 note.appendChild(dateSpan);

 // Add click listener to open notepad with saved note
 note.addEventListener('click', function () {
   openNotepad(note.textContent, note.getAttribute('title'));
 });





    note.addEventListener('click', function () {
      openNotepad(note.textContent, note.getAttribute('title'));
    });
    document.querySelector('.sidebarone').appendChild(note);

    // Clear notepad and close it
    titleTextArea.value = '';
    text.value = '';
    text.readOnly = true; // Set textarea as read-only again
    notepad.parentNode.removeChild(notepad);



     // Save note in local storage
     // Load notes from local storage and display in sidebar
var notes = JSON.parse(localStorage.getItem('notes')) || [];
notes.forEach(function (note) {
  var noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.textContent = note.title;
  noteEl.setAttribute('title', note.text);
  var dateSpan = document.createElement('span');
  dateSpan.classList.add('date');
  dateSpan.textContent = new Date(note.date).toLocaleString();
  noteEl.appendChild(dateSpan);
  noteEl.addEventListener('click', function () {
    openNotepad(note.title, note.text);
  });
  document.querySelector('.sidebar').appendChild(noteEl);
});

  

  });


  // var notes = JSON.parse(localStorage.getItem('notes')) || {};
  // notes[titleText] = noteText;
  // localStorage.setItem('notes', JSON.stringify(notes));


  var closeButton = document.createElement('button');
  closeButton.classList.add('button');
  closeButton.classList.add('close');
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', function () {
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


}


// Add event listener to clear button
document.getElementById('clear-storage').addEventListener('click', function() {
  // Clear local storage
  localStorage.clear();

  // Remove all notes from sidebar
  document.querySelector('.sidebar div').innerHTML = '';
});

const fs = require('fs')

var fetchNotes = () => {
  try {
    var notesDataString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesDataString)
  } catch(error) {
    return []
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var addNote = (title, body) => {
  var notes = fetchNotes()
  var note = {title,body}
  var duplicateNotes = notes.filter((note)=>note.title===title)
  if(duplicateNotes.length===0){
    notes.push(note)
    saveNotes(notes)
    console.log("Note created");
    console.log("==============>");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Duplicate Title');
  }
}

var getAll = () => {
  var notes = fetchNotes()
  console.log(`Displaying ${notes.length} note(s)`);
  console.log("======================>");
  notes.forEach((note)=>{
    console.log(note.title);
  })
}

var readNote = title => {
  var notes = fetchNotes()
  var theNote = notes.filter((note)=>note.title===title)
  if(theNote.length===0){
    console.log("Node not found");
  } else {
    console.log("Note:");
    console.log("======>");
    console.log(`Title: ${theNote[0].title}`);
    console.log(`Body: ${theNote[0].body}`);
  }
}

var removeNote = title => {
  var notes = fetchNotes()
  var filteredNotes = notes.filter((note)=>note.title!==title)
  saveNotes(filteredNotes)
  if(notes.length===filteredNotes){
    console.log("Note not found");
  } else {
    console.log("Note was removed");
  }
}

var help = () => {
  console.log("NotesApp Help Center:");
  console.log("======================>");
  console.log("1. Adding a new Note:");
  console.log('Command: node app.js add --title "<your title here>" --body "<your note body here>" ');
  console.log("2. Listing all notes");
  console.log("Command: node app.js list");
  console.log("3. Reading a particular note");
  console.log('Command: node app.js read --title "<title of desired note>"');
  console.log("4. Removing a particular note");
  console.log('Command: node app.js remove --title "<title of desired note>"');
}

module.exports = {addNote, getAll, readNote, removeNote, help}

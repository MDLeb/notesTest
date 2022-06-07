import './App.scss';
import React, {createContext, useState, useEffect} from 'react';
import Notes from './components/notes/notes';
import NotesForm from './components/noteForm/notesForm'
import Header from './components/header/header';
const NotesContext = createContext();

function App() {
  const [NotesData, setNotesData] = useState([]);
  const [Tags, setTags] = useState([]);
  const [filter, setFilter] = useState(['']);

  const getAllNotesDB = async () => 
  await fetch('http://localhost:8080/notes')
  .then(result => result.json());

  const addNoteDB = async (note) => {
    await fetch('http://localhost:8080/notes', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
    });
    getAllNotesDB().then(setNotesData);
  }

  const updateNodeDB = async (note, ID) => {
    await fetch(`http://localhost:8080/notes/${ID}`, {
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
    });
    getAllNotesDB().then(setNotesData);
  }
  //updateNodeDB({title:'updated', content:['updated'], tags:[]}, 10);


  const removeNoteDB = async (ID) => {
    await fetch(`http://localhost:8080/notes/${ID}`, {
      method: 'DELETE'
    })
    .then(res => res)
    .then(error => error);
    getAllNotesDB().then(setNotesData);
  }

  let updateTags = () => {
    let tagsArr = [];
    NotesData.forEach(note => {
      tagsArr.push(...note.tags)
    });
    tagsArr.forEach((tag, index) => {
      let temp = tagsArr.filter(t => t == tag);
      if(temp.length > 1)
        tagsArr.splice(index, 1)
    })
    setTags(tagsArr);
  }

  useEffect(() => {
    getAllNotesDB().then(setNotesData).then(updateTags)
   }, []);

  useEffect(() => {
    updateTags();
   }, [NotesData]);


  return (
    <NotesContext.Provider value={[NotesData, setNotesData, removeNoteDB, addNoteDB, updateNodeDB, filter, setFilter]}>
          <div className="App">
            <Header tags={Tags}></Header>
            <NotesForm></NotesForm>
            <Notes></Notes>
          </div>
    </NotesContext.Provider>
  );
}

export default App;
export {NotesContext};

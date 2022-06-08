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
  await fetch('https://notesmdleb.herokuapp.com/notes'
  )
  .then(result => result.json())
  .then(res => res);
  

  const addNoteDB = async (note) => {
    let  formBody = [];
    for (let property in note) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(note[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    await fetch('https://notesmdleb.herokuapp.com/notes', {
    method: 'POST',
    headers:{
      'Content-Type':  "application/x-www-form-urlencoded"
    },
    body: formBody
    });
    
    getAllNotesDB().then(setNotesData);
  }

  const updateNodeDB = async (note, ID) => {
    let  formBody = [];
    for (let property in note) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(note[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch(`https://notesmdleb.herokuapp.com/notes/${ID}`, {
    method: 'POST',//POST
    headers:{
      'Content-Type': "application/x-www-form-urlencoded"
    },
    body: formBody
    });
    getAllNotesDB().then(setNotesData);
  }


  const removeNoteDB = async (ID) => {
    await fetch(`https://notesmdleb.herokuapp.com/notes/${ID}`, {
      method: 'DELETE'
    })
    .then(res => res)
    .then(error => error);
    getAllNotesDB().then(setNotesData);
  }

  let updateTags = () => {
    let tagsArr = [];
    NotesData.forEach(note => {
      if(note.tags) 
        tagsArr.push(note.tags)
    });
   tagsArr = tagsArr
      .join()
      .split('#')
      .filter(elem => elem)
      .map(elem => `#${elem}`
      .replace(',', ''));
    tagsArr = Array.from(new Set(tagsArr));
    setTags(tagsArr);
  }

  useEffect(() => {
    getAllNotesDB().then(setNotesData).then(updateTags)
    //getAllNotesDB();
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

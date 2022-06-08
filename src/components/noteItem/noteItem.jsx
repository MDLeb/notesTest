import React, { useState } from "react";
import styles from './noteItem.module.scss';
import { NotesContext } from "../../App";
import NotesForm from "../noteForm/notesForm";


const NoteItem = ({note}) => {
    const highlightTags = () => {
        let content = note.content;
        note.tags?.split(',').forEach(tag => {
           content = content.replace(`${tag}`, `<span>${tag}</span>`)
        });
        content = document.createElement('div').innerHTML = content;
        return content;
    }

    const [isEditing, setIsEditing] = useState(false);

    return (
            <NotesContext.Consumer>
            {([NotesData, setNotesData, removeNoteDB, addNoteDB, updateNodeDB, filter, setFilter]) => (
                isEditing ? <NotesForm edit={true} note={note} changeIsEditing={setIsEditing}></NotesForm> :
                <div className={styles.note_item}>
                     {note.title}<br />
                    {
                         <div  className={styles.content} dangerouslySetInnerHTML={{__html: 
                            highlightTags()}}></div>
                    } <br />
                    <button className={styles.remove_btn} onClick={() => {removeNoteDB(note.id)}}></button>
                    <button className={styles.edit_btn} onClick={() => {setIsEditing(true)}}></button>
                </div>
            )}
        </NotesContext.Consumer>
        
    )
}
 export default NoteItem;
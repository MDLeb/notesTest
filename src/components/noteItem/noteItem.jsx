import React from "react";
import styles from './noteItem.module.scss';
import { NotesContext } from "../../App";


const NoteItem = ({note}) => {
    return (
            <NotesContext.Consumer>
            {([NotesData, setNotesData, removeNoteDB, addNoteDB, filter, setFilter]) => (
                <div className={styles.note_item}>
                    {note.id}<br />
                    {note.title}<br />
                    {note.content} <br />
                    {
                        note.tags && note.tags.length ?
                            <ul>{note.tags.map((tag, index) => <li className={styles.tag} key={index}>{tag}</li>)}</ul> :
                            ''
                    }
                    <button onClick={() => {removeNoteDB(note.id)}}>Delete</button>
                </div>
            )}
        </NotesContext.Consumer>
        
    )
}
 export default NoteItem;
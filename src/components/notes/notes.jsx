import React from "react";
import { NotesContext } from "../../App";
import NoteItem from "../noteItem/noteItem";
import styles from './notes.module.scss';

const Notes = () => {
    return (
        <div className={styles.notes_board}>
            <NotesContext.Consumer>
            {([NotesData, setNotesData,  removeNoteDB, addNoteDB, filter, setFilter]) => (
                NotesData.length == 0 ?
                <div>There're not any notes</div> :
                NotesData.filter(elem => {
                    let check = true;
                    filter.forEach(value => {
                        if (!elem.content[0]?.includes(value) && !elem.title?.includes(value))
                            check = false;
                    });
                        return check ? elem : '';
                }).map(element => 
                    <NoteItem note={element} key={element.id}></NoteItem>
                )
                
            )}
        </NotesContext.Consumer>
        </div>
    )
}
 export default Notes;
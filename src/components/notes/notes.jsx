import React from "react";
import { NotesContext } from "../../App";
import NoteItem from "../noteItem/noteItem";
import styles from './notes.module.scss';

const Notes = () => {
    return (
        <NotesContext.Consumer>
            {([NotesData, setNotesData,  removeNoteDB, addNoteDB, updateNodeDB, filter, setFilter]) => (
                <div className={ NotesData.length > 3 ? styles.notes_board : styles.notes_board_4} style={{height: (NotesData.length/3 + 1)*300 + 'px'}} >
                {
                    NotesData.length == 0 ?
                    <div>There're not any notes</div> :
                    NotesData.filter(elem => {
                        let check = true;
                        filter.forEach(value => {
                            if (!elem.content[0]?.toLowerCase().includes(value.toLowerCase()) &&
                                !elem.title?.toLowerCase().includes(value.toLowerCase()))
                                check = false;
                        });
                            return check ? elem : '';
                    }).map(element => 
                        <NoteItem note={element} key={element.id}></NoteItem>
                    )
                }
                </div>    
            )}
            
        </NotesContext.Consumer>
    )
}
 export default Notes;
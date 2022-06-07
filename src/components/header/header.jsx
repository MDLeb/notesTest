import React, { useRef, useState } from "react";
import { NotesContext } from "../../App";
import styles from './header.module.scss';

const Header = ({tags}) => {

    return (
        <div className={styles.header}>
            <NotesContext.Consumer>
            {([NotesData, setNotesData,  removeNoteDB, addNoteDB, updateNodeDB, filter, setFilter]) => (
                <div>
                    <div className={styles.tags}>
                        {tags.map((tag, index) => <span key={index}
                            className={filter.includes(tag) ? `${styles.active} ${styles.tag}` : styles.tag}
                            onClick={(e) => {
                                let newFilter = filter;
                                let value  = e.target.innerText;
                                if(!newFilter.includes(value)) newFilter.push(value);
                                else newFilter = newFilter.filter(elem => elem != value);
                                setFilter([...newFilter]);
                            }}
                        >{tag}</span>)}
                    </div>
                    <input type="text" placeholder="Search..." onChange={(e) => {
                        let newFilter = filter.map((elem, index) => {
                            if(index == 0) elem = e.target.value;
                            return elem});
                        setFilter([...newFilter]);
                    }} />
                </div>
                
                
                
            )}
            </NotesContext.Consumer>

        </div>
    )
}
 export default Header;
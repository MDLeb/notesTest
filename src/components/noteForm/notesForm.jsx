import React, { useRef, useState } from "react";
import { NotesContext } from "../../App";
import Button from "../UI/button/button";
import styles from './notesForm.module.scss';

const NotesForm = ({edit = false, note = {}, changeIsEditing = {}}) => {

    let [title, setTitle] = useState(edit ? note.title : '')
    let [content, setContent] = useState(edit ? note.content : '');
    let [tags, setTags] = useState(edit ? note.tags : []);


    const findTags = (e) => {
        let tagsTmp = tags;
        if(e.code != 'Space' && e.code != 'Backspace' && e.target.nodeName != 'BUTTON' && (e.code != 'Enter'|| !e.ctrlKey)) return tagsTmp;
        let contentArr = ((e.code == 'Space' || e.code == 'Backspace') ?
            e.target.value.split(' ') :
            e.target.parentNode.parentNode.querySelector('textarea').value.split(' '));

        tagsTmp = tagsTmp?.filter(el => e.target.value.includes(`${el} `));

        if(e.code == 'Space' || e.target.nodeName == 'BUTTON' || (e.code == 'Enter' && e.ctrlKey)){
            contentArr.forEach(elem => {
                let tag = elem;
                    if(tag.includes('#')) tag = tag.replace(/#*/, '#');
                if((/#{1}[\wа-яё^\W#]+(?=\s)*/g).test(tag) && tagsTmp.filter(el => el == tag).length == 0){
                    tagsTmp = ([...tagsTmp, tag]);
                } 
            });
        }
        return tagsTmp;
    }

    let onSave = async (e, updateNodeDB) => {
        newNote  = {
            'title': title,
            'content': content,
            'tags': findTags(e)
        };
        changeIsEditing(false);
        console.log(newNote);
        updateNodeDB(newNote, note.id);
    }

    let onAdd = async (e, addNoteDB) => {
        newNote  = {
            'title': title,
            'content': content,
            'tags': findTags(e)
        };
        if(!newNote.title && !newNote.content) return;
        await addNoteDB(newNote);
        setTitle('');
        setTags([]);
        setContent('');
    }
    
    let [buttonDisable, setButtonDisable] = useState(true);
    
    let newNote = {
        'title': '',
        'content': content,
        'tags': tags
    };
    

    return (
        <NotesContext.Consumer>
            {([NotesData, setNotesData, removeNoteDB, addNoteDB, updateNodeDB, filter, setFilter]) => (
                <div className={edit ? styles.form_block_edit : styles.form_block}>
                    <input placeholder="title" type="text" value={title}
                        onKeyDown={(e) => {
                            if(e.code == 'Enter' && e.ctrlKey)
                                edit ? onSave(e, updateNodeDB) : onAdd(e, addNoteDB);                           
                        }} 
                        onChange={(e) => {
                            setTitle(e.target.value)
                            if(e.target.value || e.target.parentNode.querySelector('textarea').value) 
                                setButtonDisable(false);
                            else setButtonDisable(true);
                        }}></input>
                    <textarea maxLength={700} placeholder="content" type="text" value={content} 
                        onKeyUp={(e) => {
                            if(e.target.value == '') setTags([]);
                            setTags([...findTags(e)]);
                        }}
                        onKeyDown={(e) => {
                            if(e.code == 'Enter' && e.ctrlKey)
                                edit ? onSave(e, updateNodeDB) : onAdd(e, addNoteDB);
                        }}
                        onChange={(e) => {
                            setContent([e.target.value]);
                            if(title || e.target.value) setButtonDisable(false);
                            else setButtonDisable(true);
                        }}
                    >
                    </textarea>
                        <div className={styles.tags}>
                            {tags?.length ?
                            tags.map((tag, index) => <span key={index}>{tag}</span>) : ''}
                        </div>
                        <Button disable={buttonDisable} onClick={(e) => {
                            edit ? onSave(e, updateNodeDB) : onAdd(e, addNoteDB);
                        }}>{edit ? 'save' : 'add'}</Button>
                        {
                            edit ? <button className={styles.exit_btn} onClick={() => changeIsEditing(false)}>+</button> : ''
                        }
                </div>
            )}
        </NotesContext.Consumer>
    )
}
 export default NotesForm;
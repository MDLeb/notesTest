import React, { useRef, useState } from "react";
import { NotesContext } from "../../App";
import Button from "../UI/button/button";
import styles from './notesForm.module.scss';

const NotesForm = () => {

    let title = useRef('');
    let [content, setContent] = useState('');
    let [tags, setTags] = useState([]);


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

    let onAdd = async (e, addNoteDB) => {
        newNote  = {
            'title': title.current.value,
            'content': content,
            'tags': findTags(e)
        };
        //console.log(title.current.value, newNote.title);
        if(!newNote.title && !newNote.content) return;
        await addNoteDB(newNote);
        title.current.value = '';
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
            {([NotesData, setNotesData, removeNoteDB, addNoteDB, filter, setFilter]) => (
                <div className={styles.form_block}>
                    <input placeholder="title" type="text" ref={title} 
                        onKeyDown={(e) => {
                            e.target.value = title.current.value;
                            if(e.code == 'Enter' && e.ctrlKey)
                                onAdd(e, addNoteDB);                           
                        }} 
                        onChange={(e) => {
                            if(e.target.value || e.target.parentNode.querySelector('textarea').value) 
                                setButtonDisable(false);
                            else setButtonDisable(true);
                        }}></input>
                    <textarea placeholder="content" type="text" value={content} 
                        onKeyUp={(e) => {
                            if(e.target.value == '') setTags([]);
                            setTags([...findTags(e)]);
                        }}
                        onKeyDown={(e) => {
                            if(e.code == 'Enter' && e.ctrlKey)
                                onAdd(e, addNoteDB);
                        }}
                        onChange={(e) => {
                            setContent([e.target.value]);
                            if(title.current.value || e.target.value) setButtonDisable(false);
                            else setButtonDisable(true);
                        }}
                    >
                    </textarea>
                    <div className={styles.form_block__btns}>
                        <div className={styles.tags}>
                            {tags?.length ?
                            tags.map((tag, index) => <span key={index}>{tag}</span>) : ''}
                        </div>
                        <Button disable={buttonDisable} onClick={(e) => {
                            onAdd(e, addNoteDB);
                        }}>add</Button>
                    </div>
                    
                </div>
            )}
        </NotesContext.Consumer>
    )
}
 export default NotesForm;
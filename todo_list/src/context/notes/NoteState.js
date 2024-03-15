import React from 'react';
import NoteContext from './NoteContext';
import { useState } from 'react';


// To make NoteState available to all components we will wrap app.js in it 

const NoteState = (props) => {

    const host = "http://localhost:80";

    const notesIntial = [];

    const [notes, setNotes] = useState(notesIntial);

    // Get All Notes
    const getNotes = async() => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add
    const addNote = async(title, description, tag) => {
        // TODO: API CALL

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description, tag})
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    const deleteNote = async(id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log(json);

        // filter takes a arrow function that here checks whether note._id == id
        const newNotes = notes.filter((note) => { return note._id !== id})
        setNotes(newNotes);

    }

    const editNote = async(id, title, description, tag) => {

        // Api Call copy

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();

        let newNote = JSON.parse(JSON.stringify(notes));
        for(let index = 0; index < newNote.length; index++) {
            let element = newNote[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNote);

    }
    
    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;

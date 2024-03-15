import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from './AddNote';
import {  useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
    let  Navigate =  useNavigate();

    useEffect(() => {

        if(localStorage.getItem('token')){

            getNotes();

        }else{

            Navigate('/login');

        }
        // eslint-disable-next-line

    }, []);

    const updateNote = (currentNote) => {

        reference.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});

    }
    
    const addOnClick = (e) => {
        
        // To stop the page from reloading
        console.log('Updating the note..', note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        e.preventDefault();
        props.showAlert("Updated Successfully", "success")

        // Function being called in Notestate.js
        // addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        // All the items in note will remain as it is but values in []
        // will either be overwrited or added
        // Here name is input tag name
        setNote({...note, [e.target.name]: e.target.value})
    }

    const reference = useRef(null);
    const refClose = useRef(null);

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            {/*Bootstrap Button trigger modal  */}
            <button type="button" ref={reference} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}></button>
            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                    <div id="emailHelp" className="form-text">Make sure your title is unique to avoid copyright issues.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Note</label>
                                    <input type="text" autoComplete="off" value={note.edescription} className="form-control" id="edescription" name="edescription" placeholder="Type your story here" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" autoComplete="off" value={note.etag} className="form-control" id="etag" name="etag" placeholder="Tag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={addOnClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container mx-2">
                {notes.length === 0 && 'No notes to display'}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
                    })
                }
            </div>
        </>
    )
};

export default Notes;

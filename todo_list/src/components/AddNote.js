import React,{ useContext, useState } from 'react';
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const addOnClick = (e) => {

        // To stop the page from reloading
        e.preventDefault();

        // Function being called in Notestate.js
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});

        props.showAlert("Added Successfully", "success")
    }

    const onChange = (e) => {
        // All the items in note will remain as it is but values in []
        // will either be overwrited or added
        // Here name is input tag name
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
                    <div id="emailHelp" className="form-text">Make sure your title is unique to avoid copyright issues.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note</label>
                    <input type="text" autoComplete="off" className="form-control" id="description" name="description" placeholder="Type your story here" onChange={onChange } value={note.description} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" autoComplete="off" className="form-control" id="tag" name="tag" placeholder="Tag" onChange={onChange} value={note.tag}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" autoComplete="on" className="form-check-input" id="exampleCheck1" onChange={onChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button disabled={note.title.length < 5 && note.description.length < 5} type="submit" className="btn btn-primary" onClick={addOnClick}>Add</button>
            </form>
        </div>
    )
};

export default AddNote;

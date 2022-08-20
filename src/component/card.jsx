import React, { useEffect, useContext, useState } from 'react';
import { NoteContext } from '../context/notes/notesContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
export default function Card() {
    const navigate = useNavigate();

    const context = useContext(NoteContext)

    // constext for taking the value form other level component
    const { notes, deletenote, editnote, getnotes } = context;

    // saperate useState for id because its not working with below useState
    const [id, setid] = useState('')

    //   useState for title and discreption  
    const [data, setdata] = useState({
        etitle: '',
        ediscreption: ''
    })

    // geting id when click on perticular card on edit icon
    const editIcon = (id) => {
        setid(id)
        // setdata({id})
        console.log(id, "in idgn");
    }

    // submit button for modal
    let saveChanges = (e) => {
        e.preventDefault()

        // calling the edith note function form another file
        editnote(id, data.etitle, data.ediscreption)

        // setting the modal input to empty after edit the note
        setdata({
            etitle: '',
            ediscreption: ''
        })


    }

    // on change for modal edit
    let onchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    // for calling one time to get all the notes
    useEffect(() => {

        // getnotes();
        if (localStorage.token) {
            // getnotes form the api 
            getnotes();
        }
        else {

            navigate('/login')
        }
    });


    return (
        <div className="row m-3">
            {notes.map((item, index) => {
                return (
                    <div key={index} className="card row m-3" style={{ "width": "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Title</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{item.title}</h6>
                            <p className="card-text">{item.discreption}</p>
                            <button style={{ "border": "none" }} onClick={() => deletenote(item._id)}>
                                <DeleteIcon ></DeleteIcon>
                            </button>

                            <button onClick={() => editIcon(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ "border": "none" }} >
                                <EditIcon></EditIcon>
                            </button>

                            {/* modal for editing */}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div className="modal-body">
                                            {/* form for edit the content */}
                                            <form>
                                                <h1>Edit Notes</h1>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                                    <input type="text" value={data.etitle} onChange={onchange} name="etitle" className="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Note</label>
                                                    <input type="text" value={data.ediscreption} onChange={onchange} name="ediscreption" className="form-control" id="exampleInputPassword1" required />
                                                </div>

                                                <button type="submit" onClick={saveChanges} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

import React, { createContext, useState } from 'react'

const NoteContext = createContext();
const NoteState = (props) => {
  // var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmI1ODY0OTRhZDYwNjI0YmVjOGMwNDEiLCJpYXQiOjE2NTYwNjM2MDd9.Ri0L-6u0Wet6pc2l5HhRQlHePuBbdfZMG88EQG46chI'
  var token = localStorage.token;
  const notesdata = []
  const [notes, setNotes] = useState(notesdata)
  
  // for alert
  const [alert, setalert] = useState({
    shownav:false,
    alert:false,
    msg:""
  })




  // for getting notes
  const getnotes = async () => {
    // api call
    const response = await fetch('http://localhost:5000/note/allnotes', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      }
    });
    const jsn = await response.json()
   
    setNotes(jsn.data)
  }





  // addnote
  const addnote = async (title, discreption) => {
    // api call
    const response = await fetch('http://localhost:5000/note/addnotes', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,

      },
      body: JSON.stringify({ title, discreption })
    })
    const json = await response.json();
    console.log(json)

    let note = json;
    setNotes(notes.concat(note))

    // showing alert
    setalert({
      alert:true,
      msg:"Note added"
    })
    // after 2second dont show alert
    setTimeout(() => {
      setalert({
        alert:false,
        msg:"Note added"
      })
    }, 2000);
  }






  // deletenote
  const deletenote = async (id) => {
    // api call

    const response = await fetch(`http://localhost:5000/note/deletenotes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,

      }
    })
    let json = await response.json()
    console.log(json)
    const newnote = notes.filter((item) => {
      return item._id !== id;
    })
    setNotes(newnote);
    console.log("deleted", id)

    // showing alert
    setalert({
      alert:true,
      msg:"Note deleted"
    })
    // after 2second dont show alert
    setTimeout(() => {
      setalert({
        alert:false,
        msg:"Note deleted"
      })
    }, 2000);
  }




  // editnotes
  const editnote = async (id, title, discreption) => {
    // api call

console.log(id,title,discreption,'in edigt')
  await fetch(`http://localhost:5000/note/updatingnotes/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ title, discreption })
    })
    // const json = response.json();


    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id === id) {
        notes[index].title = title
        notes[index].discreption = discreption
        break;
      }
    }
    let newNotes = JSON.parse(JSON.stringify(notes))

    setNotes(newNotes)

    // showing alert
    setalert({
      alert:true,
      msg:"Note edited"
    })
    // after 2second dont show alert
    setTimeout(() => {
      setalert({
        alert:false,
        msg:"Note edited"
      })
    }, 2000);
  }

  return (<>
    <NoteContext.Provider value={{ alert,notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  </>)
}
export default NoteState
export { NoteContext }


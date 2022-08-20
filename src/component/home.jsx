import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/notes/notesContext';
import Card from './card'
import Alert from './alert'
export default function Home() {
  const context = useContext(NoteContext)
  const { alert ,addnote } = context;
  
  // for showing nav bar
  alert.shownav=true

  // main input data 
  const [data, setdata] = useState({
    title: "",
    discreption: ""
  })


  // function invoke after hitting the submiting the button
  let submit = (e) => {
    e.preventDefault()
    addnote(data.title, data.discreption);
    setdata({
      title: "",
      discreption: ""
    })
    
    console.log(data)
  }

  //  on change of main input
  let onchange = (e) => {
    //  setting the use stat
    setdata({ ...data, [e.target.name]: e.target.value })
  }



  return (
    <>
    {/* main form */}
      <div style={{ "height": "3rem" }}>
        {alert.alert && <Alert msg={alert.msg} />}
      </div>
      <div className="container mt-3">
        <form>
          <h1>Add Note</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" value={data.title} onChange={onchange} name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Note</label>
            <input type="text" value={data.discreption} onChange={onchange} name="discreption" className="form-control" id="exampleInputPassword1" />
          </div>

          <button type="submit" onClick={submit} className="btn btn-primary">Submit</button>
        </form>
        <Card></Card>
      </div>
    </>
  )
}

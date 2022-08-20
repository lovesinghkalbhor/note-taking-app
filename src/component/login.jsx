import React, { useContext, useState} from 'react'
import { NoteContext } from '../context/notes/notesContext';
import { Link,useNavigate} from "react-router-dom";

export default function Login() {
    const context = useContext(NoteContext)
    const { alert } = context;
    alert.shownav = false

    const navigate = useNavigate();

    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmI1ODY0OTRhZDYwNjI0YmVjOGMwNDEiLCJpYXQiOjE2NTYwNjM2MDd9.Ri0L-6u0Wet6pc2l5HhRQlHePuBbdfZMG88EQG46chI'

    const [data, setdata] = useState({
        success:true,
        email: "",
        passoword: ""
    })

    //  on change of main input
    let onchange = (e) => {
        //  setting the use stat
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    let log = async (e) => {
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email, password: data.passoword })
        })
        var json = await response.json()
        console.log(data)
        console.log(json)
        if(json.success){
            setdata({ ...data, [data.success]:json.success})
            
            localStorage.setItem('token',json.authtoken)
            navigate("/home")
        }
        else{
            setdata({ success:false})
            console.log(data.success)
        }
    }
    catch(err){
        console.log(err)
    }
        
    }

    return (

        <form className="container" style={{ "width": "30rem", "marginTop": "5rem" }}>
            <h2>Enter your login detail</h2>
            {/* for showing the message if loged in information is correct */}
            {!data.success && <label className="form-label" style={{'color':'red'}}htmlFor="form2Example1">Please enter valid Credintials</label>}
             
            <div className="form-outline mb-4">
                <input name="email" type="email" id="form2Example1" onChange={onchange} className="form-control" />
                <label className="form-label" htmlFor="form2Example1">Email address</label>
            </div>


            <div className="form-outline mb-4">
                <input name="passoword" type="password" id="form2Example2" onChange={onchange} className="form-control" />
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>


            <div className="row mb-4">
                <div className="col d-flex justify-content-center">


                </div>


            </div>

            <div className="d-flex justify-content-between">
                <button type="button"  onClick={log} className="btn btn-primary btn-block mb-4">Login</button>
                <h5 className="mt-2">or</h5>
                <Link type="button" to="/signup" className="btn btn-primary btn-block mb-4">Sign Up</Link>
            </div>



        </form>
    )
}

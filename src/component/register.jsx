import React, {useState } from 'react'
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    let [register, setRegister] = useState({
        success:false,
        name: '',
        email: '',
        password: ''
    })


    //  on change of main input
    let onchange = (e) => {
        //  setting the use stat
        setRegister({ ...register, [e.target.name]: e.target.value })

    }


    let reg = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/auth', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: register.name, email: register.email, password: register.password })

        })
        const json = await response.json()
        console.log(register)
        console.log(json)
        if(json.success){
            setRegister({ ...register, [register.success]:json.success})
            localStorage.setItem('token',json.authtoken)
            navigate("/home")
        }
        else{
            setRegister({ success:false})
            console.log(register.success)
        }
    }

    return (
        <div>
            <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
                <div className="container h-19">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name="name" id="form3Example1c" onChange={onchange} className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" name="email" id="form3Example3c" onChange={onchange} className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name="password" id="form3Example4c" onChange={onchange} className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                    </div>
                                                </div>



                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" onClick={reg} className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample-image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

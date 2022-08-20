import React from 'react'
import { Route, Routes } from "react-router-dom";
import About from './about';
import Home from './home';
import Login from './login'
import Register from './register'
import NoteState from '../context/notes/notesContext';

export default function App() {
    return (
        <div>
            <NoteState>
                <Routes>
                
                    <Route exact path="/home" element={
                        <Home key="general" />}>
                    </Route>

                    <Route exact path="/about" element={
                        <About />}>
                    </Route>

                    <Route exact path="/login" element={
                        <Login />}>
                    </Route>

                    <Route exact path="/signup" element={
                        <Register />}>
                    </Route>

                </Routes>
            </NoteState>
        </div>
    )
}

import React from 'react'
import { useContext } from 'react'
import {NoteContext} from '../context/notes/notesContext'
import Login from './login'
export default function About() {
  const a = useContext(NoteContext)
  return (
    <div>
      <Login> </Login>
    </div>
  )
}
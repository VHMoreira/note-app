import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Notes, EditNote } from '@/presentation/pages'
import { NoteProvider } from '../providers/NoteProvider'

const Router: React.FC = () => {
    return (
        <NoteProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/edit-note/:noteId" element={<EditNote />}/>
                    <Route path="/" element={<Notes />}/>
                </Routes>
            </BrowserRouter>
        </NoteProvider>
    )
}

export default Router
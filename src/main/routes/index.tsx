import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Notes, EditNote } from '@/presentation/pages'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/edit-note/:noteId" element={<EditNote />}/>
                <Route path="/" element={<Notes />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
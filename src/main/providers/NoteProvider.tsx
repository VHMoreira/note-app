import React, { createContext, useCallback, useState } from 'react';
import { Note } from '@/domain/models'
import { AddNote, DeleteNote, LoadNotes } from '@/domain/usecases';
import { cashAddNote,  cashLoadNotes} from '@/data/usecases';
import { cashDeleteNote } from '@/data/usecases/cacheDeleteNote';

interface NoteContextData {
    notes: Note[]
    addNote: AddNote
    loadNotes: LoadNotes
    deleteNote: DeleteNote
}

type State = {
    notes: Note[]
}

export const NoteContext = createContext<NoteContextData>({} as NoteContextData)

export const NoteProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<State>({
        notes: []
    })

    const loadNotes = useCallback<LoadNotes>(() => {
        const response = cashLoadNotes()
        setData(prev => ({
            ...prev,
            notes: response
        }))
        return response
    }, [])

    const addNote = useCallback<AddNote>((params) => {
        const response = cashAddNote(params)
        setData(prev => ({
            ...prev,
            notes: [
                ...prev.notes,
                response
            ]
        }))
        return response
    }, [])

    const deleteNote = useCallback<DeleteNote>((params) => {
        cashDeleteNote(params)
        setData(prev => ({
            notes: prev.notes.filter((note) => note.id !== params.id)
        }))
    }, [])

    return (
        <NoteContext.Provider value={{ ...data, addNote, loadNotes, deleteNote }}>
            { children }
        </NoteContext.Provider>
    )
}
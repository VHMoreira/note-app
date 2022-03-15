import React, { createContext, useCallback, useState } from 'react';
import { Note } from '@/domain/models'
import { AddNote, DeleteNote, LoadNotes, LoadNote, EditNote } from '@/domain/usecases';
import { cashAddNote,  cashLoadNotes, cashDeleteNote, cashLoadNote, cashEditNote} from '@/data/usecases';

interface NoteContextData {
    notes: Note[]
    note: Note
    addNote: AddNote
    loadNotes: LoadNotes
    deleteNote: DeleteNote
    loadNote: LoadNote
    editNote: EditNote
}

type State = {
    notes: Note[]
    note: Note | null
}

export const NoteContext = createContext<NoteContextData>({} as NoteContextData)

export const NoteProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<State>({
        notes: [],
        note: undefined
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
            ...prev,
            notes: prev.notes.filter((note) => note.id !== params.id)
        }))
    }, [])

    const loadNote = useCallback<LoadNote>((params) => {
        const response = cashLoadNote(params)
        setData(prev => ({
            ...prev,
            note: response
        }))
        return response
    }, [])

    const editNote = useCallback<EditNote>((params) => {
        const response = cashEditNote(params)
        return response
    }, [])

    return (
        <NoteContext.Provider value={{ ...data, addNote, loadNotes, deleteNote, loadNote, editNote }}>
            { children }
        </NoteContext.Provider>
    )
}
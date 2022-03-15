import React, { createContext, useCallback, useState } from 'react';
import { Note } from '@/domain/models'
import { AddNote, LoadNotes } from '@/domain/usecases';
import { cashAddNote,  cashLoadNotes} from '@/data/usecases';

interface NoteContextData {
    notes: Note[]
    addNote: AddNote
    loadNotes: LoadNotes
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

    return (
        <NoteContext.Provider value={{ ...data, addNote, loadNotes }}>
            { children }
        </NoteContext.Provider>
    )
}
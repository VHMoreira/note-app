import React, { createContext, useCallback, useState } from 'react';
import { Note } from '@/domain/models'
import { AddNote } from '@/domain/usecases';
import { cashAddNote } from '@/data/protocols/usecases/cacheAddNote';

interface NoteContextData {
    notes: Note[]
    addNote: AddNote
}

type State = {
    notes: Note[]
}

export const NoteContext = createContext<NoteContextData>({} as NoteContextData)

export const NoteProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<State>({
        notes: []
    })

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
        <NoteContext.Provider value={{ ...data, addNote }}>
            { children }
        </NoteContext.Provider>
    )
}
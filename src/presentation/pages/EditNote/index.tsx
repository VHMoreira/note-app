import React, { useEffect } from 'react'
import { useNotes } from '@/presentation/hooks/useNotes'
import { useParams } from 'react-router-dom'

const EditNote: React.FC = () => {
    const { noteId } = useParams()
    const { note, loadNote } = useNotes()


    useEffect(() => {
        loadNote({
            id: noteId
        })
    }, [noteId])

    return <h1>EditNote {noteId}</h1>
}

export default EditNote
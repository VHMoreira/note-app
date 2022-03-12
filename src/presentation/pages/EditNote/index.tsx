import React from 'react'
import { useParams } from 'react-router-dom'

const EditNote: React.FC = () => {
    const {noteId} = useParams()
    return <h1>EditNote {noteId}</h1>
}

export default EditNote
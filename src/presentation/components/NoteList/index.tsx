import React from "react"
import Styles from './style.scss'
import { Note as NoteModel } from "@/domain/models"
import Note from "../Note"

type Props = {
    notes: NoteModel[]
    readOnly?: boolean
}

const NoteList: React.FC<Props> = ({ notes, readOnly = false }) => {

    return (
        <ul className={Styles.listContainer}>
            {notes.map((note) => (
                <Note key={note.id} title={note.title} itens={note.itens} readOnly={readOnly}/>
            ))}
        </ul>
    )
}

export default NoteList
import React from "react"
import Styles from './style.scss'
import { Note as NoteModel } from "@/domain/models"
import Note from "../Note"

type Props = {
    notes: NoteModel[]
}

const NoteList: React.FC<Props> = ({ notes }) => {

    return (
        <ul className={Styles.listContainer}>
            {notes.map((note) => (
                <Note key={note.id} title={note.title} itens={note.itens} />
            ))}
        </ul>
    )
}

export default NoteList
import React, { useCallback } from 'react'
import Styles from './style.scss'
import { Divider, Chevron } from '@/presentation/components'
import { useToggle } from '@/presentation/hooks'
import { Note as NoteModel } from '@/domain/models'
import TodoList from '../TodoList'
import Button from '../Button'
import { Edit, Trash } from '@/presentation/icons'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../ConfirmationModal'
import { useNotes } from '@/presentation/hooks/useNotes'

type Props = {
    note: NoteModel
    readOnly?: boolean
}

const Note: React.FC<Props> = ({ note, readOnly = false }) => {
    const navigate = useNavigate()
    const { deleteNote } = useNotes()
    const { isActive, toggle } = useToggle()
    const { 
        isActive: isConfirmationOpen, 
        enable: openConfirmation, 
        disable: closeConfirmation 
    } = useToggle()

    const isAllItensDone = note.itens.filter(item => item.isDone).length === note.itens.length

    const handleRedirectToEditPage = useCallback(() => {
        navigate(`edit-note/${note.id}`)
    }, [])

    const handleDeleteNote = useCallback(() => {
        deleteNote({ id: note.id })
    }, [])

    return (
        <>
            <div className={`${Styles.noteContainer} ${isAllItensDone ? Styles.allItensDone : ''}`}>
                <div className={Styles.noteHeader} onClick={toggle}>
                    <h1 className={Styles.noteTitle}>{note.title}</h1>
                    <Chevron position={ isActive ? 'up' : 'down' }/>
                </div>
                {isActive ? (
                    <>
                        <Divider />
                        <div className={Styles.noteBody}>
                            <TodoList itens={note.itens} readOnly={readOnly}/>
                            <div className={Styles.noteControllers}>
                                <Button color="light" icon={Edit} onClick={handleRedirectToEditPage}>
                                    Edit Note
                                </Button>
                                <Button color="warning" icon={Trash} onClick={openConfirmation}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </>
                ): null}
            </div>
            <ConfirmationModal 
                title="Delete Confirmation" 
                text={`
                    Do you really desire to delete this note?
                    Remember, if you delete this, all your tasks are going to be deleted too!   
                `}
                isOpen={isConfirmationOpen} 
                onClose={closeConfirmation}
                onConfirm={handleDeleteNote}
            />
        </>
    )
}

export default Note
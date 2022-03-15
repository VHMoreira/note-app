import React, { useCallback, useEffect, useState } from 'react'
import { useNotes } from '@/presentation/hooks/useNotes'
import { useNavigate, useParams } from 'react-router-dom'
import Styles from './styles.scss'
import { Cancel, Plus, Save, Trash } from '@/presentation/icons'
import { Button, ConfirmationModal } from '@/presentation/components'
import { TodoItem } from '@/domain/models'
import { useToggle } from '@/presentation/hooks'

type ItensChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => void

const EditNote: React.FC = () => {
    const { noteId } = useParams()
    const navigate = useNavigate()
    const { 
        isActive: isConfirmDeleteOpen, 
        enable: openConfirmDelete, 
        disable: closeConfirmDelete 
    } = useToggle()
    
    const { 
        isActive: isConfirmResetOpen, 
        enable: openConfirmReset, 
        disable: closeConfirmReset 
    } = useToggle()
    
    const { note, loadNote, deleteNote } = useNotes()

    const [noteTitle, setNoteTitle] = useState('')
    const [noteItens, setNoteItens] = useState<TodoItem[]>([])

    useEffect(() => {
        const loadedNote = loadNote({
            id: noteId
        })

        if(loadedNote) {
            setNoteTitle(loadedNote.title)
            setNoteItens(loadedNote.itens)
        }
    }, [noteId])

    const canDeleteItem = noteItens.length > 1

    const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target
        setNoteTitle(value)
    }

    const handleChangeItem: ItensChangeHandler = (event, id) => {
        const { value } = event.target
        const newItens = noteItens.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    text: value
                }
            }

            return item
        })
        setNoteItens(newItens)
    }

    const handleAddNewItem = () => {
        setNoteItens(prev => [
            ...prev,
            { id: -1, isDone: false, text: '' }
        ])
    }

    const handleDeleteNewItem = (id: number) => {
        if(canDeleteItem) {
            setNoteItens(prev => prev.filter((item) => item.id !== id))
        }
    }

    const handleDeleteNote = useCallback(() => {
        deleteNote({ id: note.id })
    }, [])

    const handleResetNote = useCallback(() => {
        setNoteTitle(note.title)
        setNoteItens(note.itens)
        closeConfirmReset()
    }, [note])

    const handleSaveNote = () => {
        console.log('edit note')
    }

    return (
        <div className={Styles.editNotesContainer}>
            <div className={Styles.editNotesWrapper}>
                <div className={Styles.field}>
                    <div className={Styles.fieldsHeader}>
                        <label htmlFor="title">Title</label>
                    </div>
                    <input 
                        className={Styles.fieldInput} 
                        name="title" 
                        type="text" 
                        placeholder="Ex: Market" 
                        value={noteTitle} 
                        onChange={handleChangeTitle}
                    />
                </div>
                <div className={Styles.field}>
                    <div className={Styles.fieldsHeader}>
                        <label htmlFor="itens">Note Itens</label>
                    </div>
                    <ul className={Styles.itemFieldsList}>
                        {noteItens.map((item, index) => (
                            <li key={`item-${index}`} className={Styles.fieldContainer}>
                                <input 
                                    className={Styles.fieldInput}
                                    type="text" 
                                    placeholder="Ex: Buy milk" 
                                    value={item.text} 
                                    onChange={(event) => handleChangeItem(event, index)}
                                />
                                {canDeleteItem ? <Trash className={Styles.delete} onClick={() => handleDeleteNewItem(index)}/> : null}
                                {(noteItens.length - 1) === index ? <Plus className={Styles.add} onClick={handleAddNewItem} /> : null}
                            </li>
                        ))}
                    </ul>
                    <div className={Styles.actionsContainer}>
                        <Button icon={Cancel} onClick={openConfirmReset}>reset changes</Button>
                        <Button icon={Trash} onClick={openConfirmDelete}>delete note</Button>
                        <Button icon={Save} onClick={handleSaveNote}>save note</Button>
                    </div>
                </div>
            </div>
            <ConfirmationModal 
                title="Delete Confirmation" 
                text={`
                    Do you really desire to delete this note?
                    Remember, if you delete this, all your tasks are going to be deleted too!   
                `}
                isOpen={isConfirmDeleteOpen} 
                onClose={closeConfirmDelete}
                onConfirm={handleDeleteNote}
            />
            <ConfirmationModal 
                title="Reset Confirmation" 
                text={`
                    Do you really desire to reset your changes in this note?
                    Remember, if you do this, all your changes are going to be lost!   
                `}
                isOpen={isConfirmResetOpen} 
                onClose={closeConfirmReset}
                onConfirm={handleResetNote}
            />
        </div>
    )
}

export default EditNote
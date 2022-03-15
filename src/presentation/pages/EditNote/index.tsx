import React, { useCallback, useEffect, useState } from 'react'
import { useNotes } from '@/presentation/hooks/useNotes'
import { useNavigate, useParams } from 'react-router-dom'
import Styles from './styles.scss'
import { ArrowLeft, Cancel, Plus, Save, Trash } from '@/presentation/icons'
import { Button, ConfirmationModal } from '@/presentation/components'
import { TodoItem } from '@/domain/models'
import { useToggle } from '@/presentation/hooks'

type ItensChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, index: string | number) => void

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
    
    const { note, loadNote, deleteNote, editNote } = useNotes()

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

    const handleChangeItemText = useCallback<ItensChangeHandler>((event, id) => {
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
    }, [])

    const handleChangeItemCheck = useCallback<ItensChangeHandler>((event, id) => {
        const { checked } = event.target
        const newItens = noteItens.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    isDone: checked
                }
            }

            return item
        })
        setNoteItens(newItens)
    }, [noteItens])

    const handleAddNewItem = useCallback(() => {
        setNoteItens(prev => [
            ...prev,
            { id: -1, isDone: false, text: '' }
        ])
    }, [])

    const handleDeleteItem = useCallback((id: number | string) => {
        if(canDeleteItem) {
            setNoteItens(prev => prev.filter((item) => item.id !== id))
        }
    }, [canDeleteItem])

    const handleDeleteNote = useCallback(() => {
        deleteNote({ id: noteId })
        closeConfirmDelete()
        navigate('/')
    }, [])

    const handleResetNote = useCallback(() => {
        setNoteTitle(note.title)
        setNoteItens(note.itens)
        closeConfirmReset()
    }, [note])

    const handleSaveNote = useCallback(() => {
        editNote({
            id: noteId,
            title: noteTitle,
            itens: noteItens
        })
    }, [noteTitle, noteItens])

    return (
        <div className={Styles.editNotesContainer}>
            <div className={Styles.backButtonContainer} onClick={() => navigate('/')}>
                <ArrowLeft />
                <p>Home</p>
            </div>
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
                            <li key={`item-${item.id}`} className={Styles.fieldContainer}>
                                <input 
                                    className={Styles.fieldInput}
                                    type="text" 
                                    placeholder="Ex: Buy milk" 
                                    value={item.text} 
                                    onChange={(event) => handleChangeItemText(event, item.id)}
                                />
                                <div className={Styles.itemActions}>
                                    <input type="checkbox" checked={item.isDone} onChange={(event) => handleChangeItemCheck(event, item.id)}/>
                                    {canDeleteItem ? <Trash className={Styles.delete} onClick={() => handleDeleteItem(item.id)}/> : null}
                                    {(noteItens.length - 1) === index ? <Plus className={Styles.add} onClick={handleAddNewItem} /> : null}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={Styles.actionsContainer}>
                    <Button icon={Cancel} onClick={openConfirmReset} color="warning">reset changes</Button>
                    <Button icon={Trash} onClick={openConfirmDelete} color="warning">delete note</Button>
                    <Button icon={Save} onClick={handleSaveNote} color="success">save note</Button>
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
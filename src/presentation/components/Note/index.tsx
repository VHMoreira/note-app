import React, { useCallback } from 'react'
import Styles from './style.scss'
import { Divider, Chevron } from '@/presentation/components'
import { useToggle } from '@/presentation/hooks'
import { Note as NoteModel } from '@/domain/models'
import TodoList from '../TodoList'
import Button from '../Button'
import { Edit, Trash } from '@/presentation/icons'
import { useNavigate } from 'react-router-dom'

type Props = {
    note: NoteModel
    readOnly?: boolean
}

const Note: React.FC<Props> = ({ note, readOnly = false }) => {
    const navigate = useNavigate()
    const { isActive, toggle } = useToggle()

    const isAllItensDone = note.itens.filter(item => item.isDone).length === note.itens.length

    const handleRedirectToEditPage = useCallback(() => {
        navigate(`edit-note/${note.id}`)
    }, [])

    return (
        <div className={`${Styles.noteContainer} ${isAllItensDone ? Styles.allItensDone : ''}`}>
            <div className={Styles.noteHeader} onClick={toggle}>
                <h1 className={Styles.noteTitle}>{note.title}</h1>
                <Chevron 
                    color="#fff" 
                    position={ isActive ? 'up' : 'down' }
                />
            </div>
            {isActive ? (
                <>
                    <Divider />
                    <div className={Styles.noteBody}>
                        <TodoList itens={note.itens} readOnly={readOnly}/>
                        <div className={Styles.noteControllers}>
                            <Button isLightContent icon={Edit} onClick={handleRedirectToEditPage}>
                                Edit Note
                            </Button>
                            <Button isLightContent icon={Trash}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </>
            ): null}
        </div>
    )
}

export default Note
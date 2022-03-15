import React from 'react'
import Style from './style.scss'
import { Button, CreateNoteModal, NoteList } from '@/presentation/components'
import { Plus } from '@/presentation/icons'
import { Note } from '@/domain/models'
import { useToggle } from '@/presentation/hooks'
import { useNotes } from '@/presentation/hooks/useNotes'

const notesMock: Note[] = [
    {
        id: 1,
        title: 'Teste note 1',
        itens: [
            {id:1, isDone: false, text: "Jogar Bola"},
            {id:2, isDone: true, text: "Estudar"}
        ]
    },
    {
        id: 2,
        title: 'Teste note 1',
        itens: [
            {id:1, isDone: false, text: "Jogar Bola"},
            {id:2, isDone: true, text: "Estudar"}
        ]
    },
    {
        id: 3,
        title: 'Teste note 1',
        itens: [
            {id:1, isDone: false, text: "Jogar Bola"},
            {id:2, isDone: true, text: "Estudar"}
        ]
    }
] 

const Notes: React.FC = () => {
    const { isActive, enable, disable } = useToggle()
    const { notes } = useNotes()

    return (
        <section className={Style.notesContainer}>
            <article className={Style.notesListWrapper}>
                <div className={Style.notesControllers}>
                    <Button icon={Plus} onClick={enable}>new note</Button>
                </div>
                <NoteList notes={notes} readOnly/>
            </article>
            <CreateNoteModal isOpen={isActive} onClose={disable}/>
        </section>
    )
}

export default Notes
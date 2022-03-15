import React, { useEffect } from 'react'
import Style from './style.scss'
import { Button, CreateNoteModal, EmptyList, NoteList } from '@/presentation/components'
import { Plus } from '@/presentation/icons'
import { useToggle } from '@/presentation/hooks'
import { useNotes } from '@/presentation/hooks/useNotes'

const Notes: React.FC = () => {
    const { isActive, enable, disable } = useToggle()
    const { notes, loadNotes } = useNotes()

    useEffect(() => {
        loadNotes()
    }, [])

    return (
        <section className={Style.notesContainer}>
            <article className={Style.notesListWrapper}>
                <div className={Style.notesControllers}>
                    <Button icon={Plus} onClick={enable}>new note</Button>
                </div>
                {notes.length > 0 ? <NoteList notes={notes} readOnly/> : <EmptyList />}
            </article>
            <CreateNoteModal isOpen={isActive} onClose={disable}/>
        </section>
    )
}

export default Notes
import React from 'react'
import Styles from './style.scss'
import { Divider, Chevron } from '@/presentation/components'
import { useToggle } from '@/presentation/hooks'
import { TodoItem } from '@/domain/models'
import TodoList from '../TodoList'

type Props = {
    title: string
    itens: TodoItem[]
}

const Note: React.FC<Props> = ({ title, itens }) => {
    const { isActive, toggle } = useToggle()

    return (
        <div className={Styles.noteContainer}>
            <div className={Styles.noteHeader} onClick={toggle}>
                <h1 className={Styles.noteTitle}>{title}</h1>
                <Chevron 
                    color="#fff" 
                    position={ isActive ? 'up' : 'down' }
                />
            </div>
            {isActive ? (
                <>
                    <Divider />
                    <div className={Styles.noteBody}>
                        <TodoList itens={itens}/>
                    </div>
                </>
            ): null}
        </div>
    )
}

export default Note
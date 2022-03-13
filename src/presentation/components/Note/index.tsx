import React from 'react'
import Styles from './style.scss'
import { Divider, Chevron } from '@/presentation/components'
import { useToggle } from '@/presentation/hooks'
import { TodoItem } from '@/domain/models'
import TodoList from '../TodoList'
import Button from '../Button'
import { Edit, Trash } from '@/presentation/icons'

type Props = {
    title: string
    itens: TodoItem[]
}

const Note: React.FC<Props> = ({ title, itens }) => {
    const { isActive, toggle } = useToggle()

    const isAllItensDone = itens.filter(item => item.isDone).length === itens.length

    return (
        <div className={`${Styles.noteContainer} ${isAllItensDone ? Styles.allItensDone : ''}`}>
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
                        <div className={Styles.noteControllers}>
                            <Button icon={Edit}>
                                Edit Note
                            </Button>
                            <Button icon={Trash}>
                                Delete
                            </Button>
                        </div>
                        <TodoList itens={itens}/>
                    </div>
                </>
            ): null}
        </div>
    )
}

export default Note